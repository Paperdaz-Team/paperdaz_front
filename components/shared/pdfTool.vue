<template>
  <div>
    <section class="row" style="padding-bottom: 20px;">
      <div class="col-md-12" style="position: relative; z-index: 9;">
        <login-or-register-modal
          :not-free-tool="notFreeTool"
          :show-log-reg-modal="showLogRegModal"
          @closeLogRegModal="closeLogRegModal"
          v-if="showLogRegModal"
        />
        <confirm-send-modal
          :show-confirm-send-modal="showConfirmSendModal"
          :user-role="user.role"
          @closeConfirmSendModal="toggleConfirmSendModal"
          v-if="showConfirmSendModal"
        />

        <PdfTopAppBar
          :current-page.sync="currentPage"
          :element-type="elementType"
          :is-loading="isLoading"
          :save-signatue="saveSignatue"
          :sig-svg="signatureSvg"
          :signa="signature"
          :signa-modal="sigModal"
          :total-pages="numPages"
          @closeSigModal="closeSigModal"
          @download="downloadPdf"
          @openSigModal="openSigModal"
          @page="setPage"
          @rmSignatue="rmSignatue"
          @save="saveModifications"
          @saveSignatue="saveSignatue"
          @selectTool="changeElement"
          @toggleLogRegModal="toggleLogRegModal"
          @viewAndConfirm="view_and_confirm"
        />

        <div id="canvasSizer" style="max-width: 90%; margin: auto; overflow: scroll">
          <div
            class="innerCanvasContainer"
            id="innerCanvasContainer"
            style="display:flex; justify-content: center;"
          >
            <canvas
              class="pdfCanvas mdc-elevation--z1"
              height="725"
              id="pdfCanvas"
              style="z-index: 1;"
              width="525"
            />
          </div>
        </div>
        <div id="download-pdf-canvas" style="display: none;">
          <div class="innerDownloadCanvasContainer" id="innerCanvasContainer">
            <canvas height="725" id="pdfCanvasDownload" width="525" />
          </div>
        </div>

        <div style="display: none;">
          <img :src="signatureSvg" id="img1" />
          <img :src="signatureSvgUpdate" id="img2" />
        </div>

        <signature-modal
          :signa-modal="sigModal"
          @closeSigModal="closeSigModal"
          @rmSignatue="rmSignatue"
          @saveSignatue="saveSignatue"
        />

        <register-modal :register-modal="regModal" @closeReg="closeRegModal" />
      </div>
    </section>
    <PdfBottomAppBar
      :is-loading="isLoading"
      @download="downloadPdf"
      @mini="openToolsMini"
      @page="setPage"
      @save="saveModifications"
      @viewAndConfirm="view_and_confirm"
    />

    <div class="zoomArea">
      <div @click="zoomInCanvasSizerDiv" class="icon">
        <img alt="Zoom In" src="../../assets/icons/icons8-plus-64.png" />
      </div>
      <div style="margin:10px;" />
      <div @click="zoomOutCanvasSizerDiv" class="icon">
        <img alt="Zoom Out" src="../../assets/icons/icons8-minus-64.png" />
      </div>
    </div>

    <!-- context menu -->
    <!-- <vue-simple-context-menu
      :elementId="'myUniqueId'"
      :options="options"
      :ref="'vueSimpleContextMenu'"
      @option-clicked="optionClicked"
    ></vue-simple-context-menu>-->

    <FabricObjectSelectedModal
      :delete="true"
      :left="objActionMenuLeft"
      :lowercase="true"
      :top="objActionMenuTop"
      :uppercase="true"
      @bigger="goBigger"
      @ok="closeObjActionMenuModal"
      @remove="removeItem"
      @smaller="goSmaller"
      v-if="objActionMenu"
    />
    <!-- end context menu -->

    <v-navigation-drawer
      :width="150"
      absolute
      right
      temporary
      v-if="toolsMini"
      v-model="toolsMini"
    />

    <el-dialog
      :modal="false"
      :visible.sync="signatureModal"
      @close="closeSignatureModal"
      title="Signature Wizard"
      width="50%"
    >
      <section class="container" style="border: 1px solid black; border-radius: 4px;">
        <div class="row">
          <div class="col-2 col-lg-2">
            <span class="fa-5x ti ti-text" />
          </div>
          <div class="col-7 col-lg-7">
            <div class="row">
              <b>Type</b> your Full name below, then click
              <b>Sign</b> to proceed. Your signature will be ready
            </div>
            <div class="row mt-3">
              <el-input class="col-lg-8 col-12" placeholder="John Walker" v-model="signatureName" />
              <el-button
                :disabled="signatureName.length<1"
                @click="signDocument()"
                class="col-lg-4 col-12 btn-secondary"
              >Set Signature</el-button>
            </div>
          </div>
          <div class="col-3 col-lg-3">
            <div
              id="sig"
              style="width: 100%; height: 120px; border: 1px solid black; padding-top: 40px; padding-left: 10px;"
            />
          </div>
        </div>
      </section>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import { mapActions, mapGetters, mapMutations } from "vuex";

import { fabric } from "fabric/dist/fabric";
import pdfJs from "pdfjs-dist/build/pdf";
import SignaturePad from "signature_pad";

import VueSimpleContextMenu from "vue-simple-context-menu";
import pdfNav from "./pdfHeader";
import SignatureModal from "../modals/SignatureModal";
import registerModal from "../modals/registerModal";
import PdfTopAppBar from "./pdfTopAppBar";
import PdfBottomAppBar from "./pdfBottomAppBar";
import LoginOrRegisterModal from "../modals/LoginOrRegisterModal";
import ConfirmSendModal from "../modals/ConfirmSendModal";
import FabricObjectSelectedModal from "../modals/FabricObjectSelected";

export default {
  components: {
    pdfNav,
    VueSimpleContextMenu,
    PdfTopAppBar,
    PdfBottomAppBar,
    SignatureModal,
    registerModal,
    LoginOrRegisterModal,
    ConfirmSendModal,
    FabricObjectSelectedModal
  },
  props: ["open", "file"],
  data() {
    return {
      pdf: undefined,
      pages: [],
      elementType: 0,
      currentPage: 1,
      numPages: 0,
      page: undefined,
      mods: [],
      canvi: undefined,
      canvis: [],
      canviToDownload: undefined,
      fabricObj: undefined,
      sampleText: "Sample Text",
      signatureModal: false,
      signatureName: "",
      signatureSvg: "",
      signatureWidth: 0,
      signatureHeight: 0,
      signaturePad: "",
      sigModal: false,
      signatureSvgUpdate: "",
      showLogRegModal: false,
      showConfirmSendModal: false,
      notFreeTool: "",
      toolsMini: false,
      localFile: {},
      line: undefined,
      isDrawing: undefined,
      cookedDataMove: undefined,
      signature: false,
      isLoading: {
        savingData: false,
        viewAndConfirm: false,
        downloadingPdf: false
      },
      options: [
        {
          name: "-",
          slug: "sm-font-size",
          iconCss: "e-cm-icons e-paste"
        },
        {
          name: "+",
          slug: "lg-font-size",
          iconCss: "e-cm-icons e-paste"
        },
        {
          name: "X",
          slug: "delete-item",
          iconCss: "e-cm-icons e-paste"
        }
      ],
      textFontSize: 18,
      regModal: false,
      mouseX: 0,
      mouseY: 0,
      line: false,
      lastElementCoockedID: 0,
      drawing: false,
      lineDrawing: false,
      lastActiveLineObj: null,
      currentMouseX: 0,
      currentMouseY: 0,
      objActionMenu: false,
      objActionMenuLeft: 0,
      objActionMenuTop: 0,
      objSelected: false,
      lastSelectedObj: null,
      toolIcons: [
        { elementType: 6, src: require("../../assets/img/text.png") }
      ],
      currentSelectedIconImage: new Image(),

      // ZOOMING VARS
      mousePosition: null,
      offset: [0, 0],
      div: null,
      isDown: false,
      scale: 1,

      // forActionMenuPosition
      mousePosX: 0,
      mousePosY: 0,
      canvasBoundingRectTop: 0,
      canvasBoundingRectLeft: 0,
      panZoom: null,

      // Last file data
      lastFileObjects: null,
      lastFile: false
    };
  },
  created() {
    this.fetchPDF();
  },
  mounted() {
    this.setRedirectedFromPdfToolPage(false);
    if (this.lastFileID === this.$route.query.id) {
      this.lastFile = true;
    }
    try {
      $_Tawk.hideWidget();
    } catch (ex) {}
    const localObj = JSON.parse(JSON.stringify(this.file));
    this.localFile = localObj;
    this.mods = localObj.modifications;
    if (this.isLoggedIn) {
      this.signatureSvg = this.userSignature;
      this.signature = true;
    }
    document.getElementById("innerCanvasContainer").addEventListener(
      "touchstart",
      e => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      false
    );
  },
  methods: {
    ...mapActions("files", ["update", "persistForGuest"]),
    ...mapActions("user_mgt", ["callWithToken", "setSignature"]),
    ...mapMutations("user_mgt", ["setSignature"]),
    ...mapMutations("files", ["addActorsAfterChanges", "confirm"]),
    ...mapMutations("pdfFile", [
      "setLastFileID",
      "setLastFileFabricObjects",
      "setRedirectedFromPdfToolPage"
    ]),
    closeModal() {
      this.$router.back();
    },
    closeLogRegModal() {
      this.showLogRegModal = false;
      this.notFreeTool = "";
    },
    closeRegModal(e) {
      const self = this;
      self.regModal = false;
      if (e.success === true) {
        self
          .callWithToken({
            parameters: {
              file: self.file
            },
            action: self.persistForGuest
          })
          .then(success => {});
      }
    },
    removeItem() {
      this.canvis[this.currentPage].remove(
        this.canvis[this.currentPage].getActiveObject()
      );
      this.closeObjActionMenuModal();
      const objs = this.canvis[this.currentPage].getObjects();
      let strObj = JSON.stringify(objs);
      strObj = JSON.parse(strObj);
      this.setLastFileFabricObjects(strObj);
    },
    goSmaller() {
      const newItem = this.canvis[this.currentPage].getActiveObject();
      if (newItem.fontSize) {
        newItem.fontSize -= 1;
      } else if (newItem.x1 && newItem.x2 && newItem.y1 && newItem.y2) {
        newItem.scaleX -= 0.1;
      } else {
        newItem.scaleX -= 0.1;
        newItem.scaleY -= 0.1;
      }
      this.canvis[this.currentPage].setActiveObject(newItem);
      this.canvis[this.currentPage].renderAll();
      const objs = this.canvis[this.currentPage].getObjects();
      let strObj = JSON.stringify(objs);
      strObj = JSON.parse(strObj);
      this.setLastFileFabricObjects(strObj);
    },
    goBigger() {
      const newItem = this.canvis[this.currentPage].getActiveObject();
      if (newItem.fontSize) {
        newItem.fontSize += 2;
      } else if (newItem.x1 && newItem.y1) {
        newItem.scaleX += 0.1;
      } else {
        newItem.scaleX += 0.1;
        newItem.scaleY += 0.1;
      }
      this.canvis[this.currentPage].setActiveObject(newItem);
      this.canvis[this.currentPage].renderAll();
      const objs = this.canvis[this.currentPage].getObjects();
      let strObj = JSON.stringify(objs);
      strObj = JSON.parse(strObj);
      this.setLastFileFabricObjects(strObj);
    },
    checkLastSelected() {
      if (this.lastSelectedObj != null) {
        this.canvis[this.currentPage].setActiveObject(this.lastSelectedObj);
      }
    },
    opteion(event, fab) {
      if (!event.e) return;
      if (this.canvis[this.currentPage].getActiveObject()) {
        document.getElementById("canvasSizer").style.overflow = "hidden";
        this.lastSelectedObj = this.canvis[this.currentPage].getActiveObject();
        this.objSelected = true;
        this.objActionMenuLeft =
          this.mousePosX * this.scale +
          this.canvasBoundingRectLeft +
          15 -
          document.getElementById("canvasSizer").scrollLeft;
        this.objActionMenuTop =
          this.mousePosY * this.scale +
          this.canvasBoundingRectTop -
          30 -
          document.getElementById("canvasSizer").scrollTop;
        this.objActionMenu = true;
        const activeItem = this.canvis[this.currentPage].getActiveObject();
        const objs = this.canvis[this.currentPage].getObjects();
        let strObj = JSON.stringify(objs);
        strObj = JSON.parse(strObj);
        this.setLastFileFabricObjects(strObj);
      } else {
        document.getElementById("canvasSizer").style.overflow = "scroll";
      }
    },
    closeObjActionMenuModal() {
      this.objSelected = false;
      this.objActionMenu = false;
      this.lastSelectedObj = null;
      this.canvis[this.currentPage].discardActiveObject();
      this.canvis[this.currentPage].renderAll();
      // this.panZoom.resume()
      document.getElementById("canvasSizer").style.overflow = "scroll";
    },
    openToolsMini() {
      this.toolsMini = true;
    },
    closeSignatureModal() {
      this.signatureModal = false;
    },
    openSignatureModal(mini = false) {
      if (mini) {
        this.toolsMini = false;
      }
      this.signatureModal = true;
    },
    toggleLogRegModal(value) {
      this.showLogRegModal = value;
    },
    changeElement(el, mini = false) {
      this.closeObjActionMenuModal();
      if (!this.isLoggedIn && el === 7) {
        this.toggleLogRegModal(true);
        this.notFreeTool = "Name";
      } else if (!this.isLoggedIn && el === 9) {
        this.toggleLogRegModal(true);
        this.notFreeTool = "Initials";
      } else if (el === 15) {
        document.getElementById("canvasSizer").style.overflow = "hidden";
        this.canvis[this.currentPage].isDrawingMode = true;
        this.elementType = el;
      } else {
        document.getElementById("canvasSizer").style.overflow = "scroll";
        this.canvis[this.currentPage].isDrawingMode = false;
        if (mini) {
          this.toolsMini = false;
        }
        this.elementType = el;
      }
    },
    rmSignatue() {
      this.signaturePad.clear();
    },
    openSigModal() {
      const sigCanvas = document.getElementById("sig-canvas");
      const sigContext = sigCanvas.getContext("2d");
      const sigImage = new Image();
      sigImage.src = this.userSignature;
      sigContext.drawImage(sigImage, 0, 0);
      sigImage.onload = () => sigContext.drawImage(sigImage, 0, 0);
      this.sigModal = true;
    },
    closeSigModal() {
      this.sigModal = false;
    },
    toggleConfirmSendModal(value) {
      this.showConfirmSendModal = value;
    },
    saveSignatue() {
      this.closeObjActionMenuModal();
      this.elementType = 8;
      this.signatureSvg = this.signaturePad.toDataURL("image/svg");
      const x = this.signaturePad.toData();
      if (this.isLoggedIn) {
        this.setSignature(this.signatureSvg);
      }
      this.sigModal = false;
    },
    toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    },
    setPage(page) {
      const dis = this;
      let i;
      if (page === 1 && page < dis.numPages) {
        i = dis.currentPage + 1;
      }
      if (page === 0 && dis.currentPage > 1) {
        i = dis.currentPage - 1;
      }
      if (i) {
        dis.currentPage = i;
      }
      if (this.mods.length > this.file.modifications.length) {
        // this.saveModifications();
        this.$confirm("Save Changes?", "warning", {
          confirmButtonText: "Yes",
          cancelButtonText: "Discard"
        })
          .then(() => {
            dis.saveModifications();
            dis.destroyPage();
            dis.currentPage = Number(page);
            dis.drawCanvas();
          })
          .catch(() => {
            dis.destroyPage();
            dis.currentPage = Number(page);
            dis.drawCanvas();
            dis.$message({
              type: "info",
              message: "Changes Discarded"
            });
          });
      } else {
        this.destroyPage();
        this.currentPage = Number(page);
        this.drawCanvas();
      }
    },
    destroyPage() {
      // Get pdfCanvas#pdf_canvas
      const canvas = document.getElementById("pdfCanvas");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("load", () => {});
      window.removeEventListener("resize", () => {});
    },
    fetchDate() {
      const df = new Date();
      const fdd = `${df.getDate()}/${df.getMonth() + 1}/${df.getFullYear()}`;
      // var fss = df.getHours()+':'+df.getMinutes()+':'+df.getSeconds();
      return fdd;
    },
    fabricClickHandler(event, fabricObj) {
      //  this.opteion(event, fabricObj);
      document.getElementById("canvasSizer").style.overflow = "hidden";
      const cookedData = {
        left:
          event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top: event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top
      };
      cookedData.cornerSize = 0;
      cookedData.selectionLineWidth = 1;
      // cookedData.cornerStyle = "line";
      cookedData.transparentCorners = true;
      cookedData.cornerColor = "hsl(141, 71%, 48%)";
      cookedData.hasRotatingPoint = false;
      // cookedData.hasControls = false
      cookedData.padding = 3;
      cookedData.borderDashArray = [3, 3];
      cookedData.borderColor = "green";

      const dis = this;
      const canvas = this.canvis[dis.currentPage];
      let contentToAdd;
      let contentToAddOptions;

      const pointer = event.touches
        ? dis.canvis[dis.currentPage].getPointer(event.touches[0])
        : dis.canvis[dis.currentPage].getPointer(event);

      if (this.lineDrawing) {
        const i = dis.lastElementCoockedID;
        fabricObj.remove(dis.lastActiveLineObj);
        var points = [dis.mouseX, dis.mouseY, pointer.x, pointer.y];
        cookedData.id = i;
        cookedData.stroke = "#000000";
        cookedData.fill = "#000000";
        cookedData.strokeWidth = 8;
        cookedData.padding = 3;
        cookedData.left = pointer.x < dis.mouseX ? pointer.x : dis.mouseX;
        cookedData.top =
          pointer.y < dis.mouseY ? pointer.y - 3 : dis.mouseY - 3;
        cookedData.lockScalingY = true;
        contentToAdd = new fabric.Line(points, cookedData);
        dis.lastActiveLineObj = contentToAdd;
        fabricObj.add(contentToAdd);
      } else if (this.highLightDrawing) {
        const i = dis.lastElementCoockedID;
        fabricObj.remove(dis.lastActiveLineObj);
        var points = [dis.mouseX, dis.mouseY, pointer.x, pointer.y];
        cookedData.id = i;
        cookedData.width = Math.abs(pointer.x - dis.mouseX);
        cookedData.height = 20;
        cookedData.fill = "#d4d40096";
        cookedData.left = pointer.x < dis.mouseX ? pointer.x : dis.mouseX;
        cookedData.top =
          pointer.y < dis.mouseY ? pointer.y - 9 : dis.mouseY - 9;
        contentToAdd = new fabric.Rect(cookedData);
        dis.lastActiveLineObj = contentToAdd;
        fabricObj.add(contentToAdd);
      } else if (dis.elementType === 1) {
        // Checkmark
        cookedData.id = new Date().getTime();
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 8;
        cookedData.top =
          dis.canvis[dis.currentPage].getPointer(event).y - 16.382;
        // cookedData
        fabric.loadSVGFromString(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.737 16.382"><defs><style>.a{fill:none;stroke:#363636;stroke-width:5px;}</style></defs><path class="a" d="M2.314,7.071l7.131,7.3,5.15-5.458,7.292-7.729" transform="translate(-1.241 -0.155)"/></svg>',
          (objects, options) => {
            const shape = fabric.util.groupSVGElements(objects, options);
            shape.set(cookedData);
            canvas.add(shape);
            canvas.calcOffset();
            dis.saveMods(cookedData);
            // dis.elementType = 0;
          }
        );
      } else if (dis.elementType === 2) {
        // Cross
        cookedData.id = new Date().getTime();
        cookedData.typeOfItem = "text";
        cookedData.fill = "#000";
        cookedData.fontSize = 25;
        cookedData.selectable = true;
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 3;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 24;
        contentToAdd = new fabric.IText("X", cookedData);
        // dis.saveMods(cookedData, dis.fetchDate());
        // dis.elementType = 0;
        fabricObj.add(contentToAdd);
        this.canvis[this.currentPage].setActiveObject(contentToAdd);
      } else if (dis.elementType === 3) {
        // Bullet
        cookedData.id = new Date().getTime();
        cookedData.radius = 10;
        cookedData.stroke = "#000000";
        cookedData.strokeWidth = 1;
        cookedData.fill = "black";
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 9;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 10;
        contentToAdd = new fabric.Circle(cookedData);
        dis.saveMods(cookedData);
        fabricObj.add(contentToAdd);
      } else if (dis.elementType === 5) {
        // Date
        // cookedData
        cookedData.id = new Date().getTime();
        cookedData.typeOfItem = "text";
        cookedData.fill = "#000";
        cookedData.fontSize = 24;
        cookedData.selectable = true;
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 3;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 24;
        contentToAdd = new fabric.IText(dis.fetchDate(), cookedData);
        dis.saveMods(cookedData, dis.fetchDate());
        // dis.elementType = 0;
        fabricObj.add(contentToAdd);
        this.canvis[this.currentPage].setActiveObject(contentToAdd);
      } else if (dis.elementType === 6) {
        // Text
        cookedData.elementType = 6;
        cookedData.id = new Date().getTime();
        cookedData.typeOfItem = "text";
        cookedData.fill = "#000";
        cookedData.fontSize = 25;
        cookedData.fontFamily = "arial";
        cookedData.selectable = true;
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 26;
        // cookedData.selected = true;

        cookedData.originX = "left";
        contentToAdd = new fabric.IText("", cookedData);
        fabricObj.add(contentToAdd).setActiveObject(contentToAdd);
        dis.opteion(event, fabricObj);
        contentToAdd.enterEditing();

        this.canvis[dis.currentPage].on("text:editing:exited", e => {
          dis.saveMods(cookedData, e.target.text);
          dis.setLastFileFabricObjects(
            JSON.parse(JSON.stringify(fabricObj.getObjects()))
          );
        });
      } else if (dis.elementType === 7) {
        // Name
        // cookedData
        if (dis.isLoggedIn) {
          cookedData.id = new Date().getTime();
          cookedData.typeOfItem = "text";
          cookedData.fill = "#000";
          cookedData.fontSize = 24;
          cookedData.selectable = true;
          cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 3;
          cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 24;
          contentToAdd = new fabric.IText(dis.computedName, cookedData);
          dis.saveMods(cookedData, dis.computedName);
          // dis.elementType = 0;
          fabricObj.add(contentToAdd);
        } else {
          dis.regModal = true;
        }
      } else if (dis.elementType === 8) {
        // signature
        cookedData.id = new Date().getTime();
        const imgElement = document.querySelector(".sig-img");
        cookedData.element = imgElement;
        cookedData.backgroundColor = "transparent";
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 5;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 88;
        contentToAdd = new fabric.Image(imgElement, cookedData);
        contentToAdd.scaleX = 0.5;
        contentToAdd.scaleY = 0.5;
        dis.saveMods(cookedData, imgElement.src);
        fabricObj.add(contentToAdd);
      } else if (dis.elementType === 9) {
        // Initials
        if (dis.isLoggedIn) {
          // cookedData
          cookedData.id = new Date().getTime();
          cookedData.typeOfItem = "text";
          cookedData.fill = "#000";
          cookedData.fontSize = 24;
          cookedData.selectable = true;
          cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 3;
          cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 24;
          contentToAdd = new fabric.IText(dis.computedInitial, cookedData);
          dis.saveMods(cookedData, dis.computedInitial);
          fabricObj.add(contentToAdd);
        } else {
          dis.regModal = true;
        }
      } else if (dis.elementType === 10) {
        // Circle
        cookedData.id = new Date().getTime();
        cookedData.radius = 20;
        cookedData.stroke = "#000000";
        cookedData.strokeWidth = 1;
        cookedData.fill = "transparent";
        cookedData.left = dis.canvis[dis.currentPage].getPointer(event).x - 18;
        cookedData.top = dis.canvis[dis.currentPage].getPointer(event).y - 20;
        contentToAdd = new fabric.Circle(cookedData);
        dis.saveMods(cookedData);
        fabricObj.add(contentToAdd);
      } else if (dis.elementType === 12) {
        dis.lineDrawing = true;
        // Line
        var points = [dis.mouseX, dis.mouseY, pointer.x, pointer.y];
        const i = new Date().getTime();
        cookedData.id = i;
        dis.lastElementCoockedID = i;
        cookedData.stroke = "#000000";
        cookedData.fill = "#000000";
        cookedData.padding = 3;
        cookedData.strokeWidth = 8;
        cookedData.left = pointer.x < dis.mouseX ? pointer.x : dis.mouseX;
        cookedData.top =
          pointer.y < dis.mouseY ? pointer.y - 3 : dis.mouseY - 3;
        cookedData.lockScalingY = true;
        contentToAdd = new fabric.Line(points, cookedData);
        dis.lastActiveLineObj = contentToAdd;
        dis.saveMods(cookedData);
        fabricObj.add(contentToAdd);
      } else if (dis.elementType === 14) {
        // Highlight
        dis.highLightDrawing = true;
        const i = new Date().getTime();
        cookedData.id = i;
        dis.lastElementCoockedID = i;
        cookedData.width = Math.abs(pointer.x - dis.mouseX);
        cookedData.height = 20;
        cookedData.fill = "#d4d40096";
        cookedData.left = pointer.x < dis.mouseX ? pointer.x : dis.mouseX;
        cookedData.top =
          pointer.y < dis.mouseY ? pointer.y - 9 : dis.mouseY - 9;
        contentToAdd = new fabric.Rect(cookedData);
        dis.lastActiveLineObj = contentToAdd;
        dis.saveMods(cookedData);
        fabricObj.add(contentToAdd);
      }
      // this.setLastFileFabricObjects(fabricObj.getObjects())
    },
    view_and_confirm() {
      this.elementType = 0;
      const dis = this;
      dis.isLoading.viewAndConfirm = true;
      if (dis.isLoggedIn) {
        const actor = this.user.Id;
        const pdfFile = this.file;
        const pdfTitle = this.file.title;

        this.renderPdfToDownloadOrSave().then(() => {
          setTimeout(() => {
            const pageData = dis.canvis[dis.currentPage].toDataURL({
              format: "jpeg",
              multiplier: 10
            });
            const pdf = new jsPDF("", "pt", "a4");
            pdf.addImage(pageData, "JPEG", 0, 0, 595.28, 841.89);

            const pdfData = pdf.output("datauristring");

            dis.confirm({ actor });
            dis
              .callWithToken({
                parameters: {
                  file: pdfFile,
                  pdfTitle,
                  pdfData
                },
                action: dis.update
              })
              .then(success => {
                dis.isLoading.viewAndConfirm = false;
                this.toggleConfirmSendModal(true);
              });
          }, 3000); // Set time out if for give time to the canvas to render with all objects
        });
      } else {
        dis.isLoading.viewAndConfirm = false;
        dis.regModal = true;
      }
    },
    saveModifications() {
      this.isLoading.savingData = true;
      const dis = this;
      if (dis.isLoggedIn) {
        this.renderPdfToDownloadOrSave().then(() => {
          setTimeout(() => {
            const pageData = dis.canviToDownload.toDataURL("image/png", 1.0);

            // Default vertical direction, size ponits, format a4[595.28,841.89]
            const pdf = new jsPDF("", "pt", "a4");

            // Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
            pdf.addImage(pageData, "PNG", 0, 0, 595.28, (592.28 / 1224) * 1584);
            const pdfData = pdf.output("datauristring");

            dis.addActorsAfterChanges({ actor: dis.user.Id });
            dis
              .callWithToken({
                parameters: {
                  pdfTitle: dis.file.title,
                  file: pdfData
                },
                action: dis.update
              })
              .then(response => {
                dis.isLoading.savingData = false;
                dis.localFile = response.updated;
                dis.$message({
                  type: "success",
                  message: "Update completed"
                });
              });
          }, 3000);
        });
      } else {
        dis.isLoading.savingData = false;
        dis.regModal = true;
      }
    },
    saveMods(cookedData, val) {
      this.mods.push({
        elementType: this.elementType,
        cookedData,
        page: this.currentPage,
        elementValue: val
      });
    },
    zoomInCanvasSizerDiv() {
      if (this.scale < 5) {
        const canvasSizerDiv = document.getElementById("innerCanvasContainer");
        this.scale += 0.1;
        this.setZoom(this.scale, canvasSizerDiv);
      }
    },
    zoomOutCanvasSizerDiv() {
      if (this.scale > 1) {
        const canvasSizerDiv = document.getElementById("innerCanvasContainer");
        this.scale -= 0.1;
        this.setZoom(this.scale, canvasSizerDiv);
      }
    },
    setZoom(zoom, el) {
      const transformOrigin = [0, 0];
      el = el || instance.getContainer();
      const p = ["webkit", "moz", "ms", "o"];
      const s = `scale(${zoom})`;
      const oString = `${transformOrigin[0] * 100}% ${transformOrigin[1] *
        100}%`;

      for (let i = 0; i < p.length; i++) {
        el.style[`${p[i]}Transform`] = s;
        el.style[`${p[i]}TransformOrigin`] = oString;
      }

      el.style.transform = s;
      el.style.transformOrigin = oString;
    },
    drawCanvas() {
      const canvasSig = document.getElementById("sig-canvas");
      this.signaturePad = new SignaturePad(canvasSig, {
        // Necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
        backgroundColor: "rgb(255, 255, 255, 0)"
      });

      const canvas = document.getElementById("pdfCanvas");
      const context = canvas.getContext("2d");
      const dis = this;
      this.fabricObj = fabric;

      this.pdf.getPage(dis.currentPage).then(page => {
        dis.page = page;
        const scale = 2;
        const viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page
          .render({
            canvasContext: context,
            viewport
          })
          .promise.then(() => {
            context.scale(600 / 96, 600 / 96);
            const bg = canvas.toDataURL("image/png", 1);
            const fcanvas = new fabric.Canvas("pdfCanvas", {
              width: viewport.width,
              height: viewport.height,
              // preserveObjectStacking: true,
              allowTouchScrolling: true,
              selection: false
            });
            fcanvas.freeDrawingBrush.color = "black";
            fcanvas.freeDrawingBrush.width = 5;
            // fcanvas.isDrawingMode = false
            dis.canvis[dis.currentPage] = fcanvas;

            if (dis.lastFile) {
              const objs = dis.lastFileFabricObjects;
              if (objs != null) {
                dis.drawFirstTime(objs, fcanvas);
              }
              dis.lastFile = false;
            }

            dis.canvasBoundingRectLeft = dis.canvis[
              dis.currentPage
            ].upperCanvasEl.getBoundingClientRect().left;
            dis.canvasBoundingRectTop = dis.canvis[
              dis.currentPage
            ].upperCanvasEl.getBoundingClientRect().top;

            $(fcanvas.upperCanvasEl).click(e => {
              if (!dis.canvis[dis.currentPage].getActiveObject()) {
                dis.objActionMenu = false;
              }
            });

            fcanvas.on("object:selected", e => {
              dis.mousePosX = e.target.calcCoords().tl.x;
              dis.mousePosY = e.target.calcCoords().tl.y;
              dis.opteion(e, fcanvas);
            });
            fcanvas.on("object:moving", e => {
              dis.mousePosX = e.target.calcCoords().tl.x;
              dis.mousePosY = e.target.calcCoords().tl.y;
              dis.opteion(e, fcanvas);
            });

            fcanvas.on("mouse:down", e => dis.mouseDownFunction(e, fcanvas));
            fcanvas.on("mouse:up", e => dis.mouseUpFunction(e, fcanvas));
            fcanvas.on("mouse:move", e => dis.mouseMoveFunction(e, fcanvas));

            fcanvas.setBackgroundImage(bg, fcanvas.renderAll.bind(fcanvas));

            window.addEventListener(
              "load",
              dis.resize(fcanvas, canvasSig),
              false
            );
            window.addEventListener(
              "resize",
              () => dis.resize(fcanvas, canvasSig),
              false
            );

            dis.setOldModifications;
          });
      });
    },
    drawFirstTime(objs, fcanvas) {
      objs.forEach(o => {
        const cookedData = {
          left: o.left,
          top: o.top
        };
        cookedData.cornerSize = 0;
        cookedData.selectionLineWidth = 1;
        cookedData.transparentCorners = true;
        cookedData.cornerColor = "hsl(141, 71%, 48%)";
        cookedData.hasRotatingPoint = false;
        cookedData.padding = 3;
        cookedData.borderDashArray = [3, 3];
        cookedData.borderColor = "green";
        cookedData.scaleX = o.scaleX;
        cookedData.scaleY = o.scaleY;
        cookedData.width = o.width;
        cookedData.height = o.height;

        switch (o.type) {
          case "i-text":
            cookedData.originX = "left";
            cookedData.fontSize = 25;
            fcanvas.add(new fabric.IText(o.text, cookedData));
            break;
          case "text":
            cookedData.originX = "left";
            fcanvas.add(
              new fabric.IText(o.text, Object.assign({}, cookedData, o))
            );
            break;
          case "path":
            fcanvas.add(
              new fabric.Path(
                o.path,
                Object.assign({}, cookedData, {
                  fill: false,
                  stroke: "black",
                  strokeWidth: 5
                })
              )
            );
            break;
          case "circle":
            fcanvas.add(new fabric.Circle(Object.assign({}, o, cookedData)));
            break;
          case "line":
            fcanvas.add(
              new fabric.Line(
                [o.x1, o.y1, o.x2, o.y2],
                Object.assign({}, o, cookedData)
              )
            );
            break;
          case "rect":
            fcanvas.add(new fabric.Rect(Object.assign({}, o, cookedData)));
            break;
          case "image":
            new fabric.Image.fromURL(
              o.src,
              img => {
                fcanvas.add(img);
              },
              Object.assign({}, o, cookedData)
            );
            break;
        }
      });
      fcanvas.renderAll();
    },
    mouseUpFunction(event, fcanvas) {
      if (!this.objSelected) {
        if (this.drawing) {
          this.fabricClickHandler(event, fcanvas);
        }
        this.lineDrawing = false;
        this.highLightDrawing = false;
        this.drawing = false;
        document.getElementById("canvasSizer").style.overflow = "scroll";
        const objs = fcanvas.getObjects();
        let strObj = JSON.stringify(objs);
        strObj = JSON.parse(strObj);
        this.setLastFileFabricObjects(strObj);
        if (this.lastFileID != this.$route.query.id) {
          this.setLastFileID(this.$route.query.id);
        }
      }
    },
    mouseDownFunction(event, fcanvas) {
      if (!this.objSelected) {
        this.drawing = true;
        this.setCurrentMousePosition(event);
        if (this.elementType === 12) {
          this.fabricClickHandler(event, fcanvas);
        } else if (this.elementType === 14) {
          this.fabricClickHandler(event, fcanvas);
        }
      } else {
        this.checkLastSelected();
      }
    },
    mouseLeaveFunction(event, fcanvas) {
      if (!this.objSelected) {
        this.lineDrawing = false;
        this.highLightDrawing = false;
        document.getElementById("canvasSizer").style.overflow = "scroll";
      }
    },
    mouseMoveFunction(event, fcanvas) {
      if (this.lineDrawing) this.fabricClickHandler(event, fcanvas);
      else if (this.highLightDrawing) this.fabricClickHandler(event, fcanvas);
    },
    setCurrentMousePosition(event) {
      if (event.touches) {
        const pointer = this.canvis[this.currentPage].getPointer(
          event.touches[0]
        );
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
      } else {
        const pointer = this.canvis[this.currentPage].getPointer(event);
        this.mouseX = pointer.x;
        this.mouseY = pointer.y;
      }
    },
    resize(fcanvas, canvasSig) {
      const canvasSizer = document.getElementById("canvasSizer");
      const canvasScaleFactor = canvasSizer.offsetWidth / window.innerWidth;
      let width = canvasSizer.offsetWidth;
      let height = canvasSizer.offsetHeight;
      const ratio = fcanvas.getWidth() / fcanvas.getHeight();
      if (width / height > ratio) {
        width = height * ratio;
      } else {
        height = width / ratio;
      }

      const scale = width / fcanvas.getWidth();
      let zoom = fcanvas.getZoom();
      zoom *= scale;
      fcanvas.setDimensions({ width, height });
      fcanvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

      if (window.innerWidth < 768) {
        canvasSig.width = 306;
        canvasSig.height = 176;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        canvasSig.width = 656;
        canvasSig.height = 176;
      }
    },
    moveHandler(evt) {
      const newItem = evt.target;
      const { id } = evt.target;
      const currentObj = this.mods.find(e => e.cookedData.id === id);
      const index = this.mods.indexOf(currentObj);
      currentObj.cookedData.scaleY = 1;
      currentObj.cookedData.scaleX = 1;
      const result = {};
      for (const key in currentObj.cookedData) {
        if (newItem[key]) {
          result[key] = newItem[key];
        }
      }
      this.mods[index].cookedData = result;
    },
    modifiedHandler(evt) {
      const newItem = evt.target;
      const { id } = evt.target;
      const currentObj = this.mods.find(e => e.cookedData.id === id);
      const index = this.mods.indexOf(currentObj);
      const result = {};
      for (const key in currentObj.cookedData) {
        if (newItem[key]) {
          result[key] = newItem[key];
        }
      }
      this.mods[index].cookedData = result;
    },
    fetchPDF() {
      const dis = this;
      pdfJs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.entry";
      const url = null;
      pdfJs.getDocument(dis.file.location).then(pdf => {
        dis.pdf = pdf;
        dis.numPages = pdf.numPages;
        // for(let i=0;i<pdf.numPages;i++){
        //   dis.canvis.push(new fabric.Canvas("pdfCanvas", {
        //     preserveObjectStacking: true,
        //     allowTouchScrolling: true,
        //     selection : false,
        //   }))
        // }
      });
    },
    drawSignatureCanvas() {
      const d = this;
      const sig = document.getElementById("sig");
      const canvas = document.createElement("canvas");
      canvas.setAttribute("id", "signatureCanvas");
      canvas.setAttribute("style", "width: 140px; height: 80px;");
      sig.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://fonts.googleapis.com/css?family=Kristi";
      document.getElementsByTagName("head")[0].appendChild(link);
      // Trick from http://stackoverflow.com/questions/2635814/
      const image = new Image();
      image.src = link.href;
      image.onerror = function() {
        ctx.font = '80px "Kristi"';
        ctx.textBaseline = "top";
        console.dir(canvas);
        ctx.fillText(d.returnSignature, 20, 10);
      };
    },
    signDocument() {
      const canvas = document.getElementById("signatureCanvas");
      const context = canvas.getContext("2d");
      const metrics = context.measureText(this.signatureName);
      this.signatureSvg = canvas.toDataURL("image/png");
      this.signatureWidth = metrics.width;
      const height = parseInt(context.font.match(/\d+/), 10);
      this.signatureHeight = height;
      // this.changeElement(8);
      this.signature = true;
      this.signatureModal = false;
    },
    renderPdfToDownloadOrSave() {
      const canvas = document.getElementById("pdfCanvasDownload");
      // var canvas = this.canvis[dis.currentPage];
      const context = canvas.getContext("2d");
      const dis = this;
      this.pdf.getPage(dis.currentPage).then(page => {
        dis.page = page;
        const scale = 2;
        const viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page
          .render({
            canvasContext: context,
            viewport
          })
          .promise.then(() => {
            context.scale(600 / 96, 600 / 96);
            const bg = canvas.toDataURL("image/png", 1);
            const fcanvas = new fabric.Canvas("pdfCanvasDownload", {
              width: viewport.width,
              height: viewport.height,
              preserveObjectStacking: false
            });
            dis.canviToDownload = fcanvas;
            fcanvas.on("object:scaling", dis.moveHandler);
            fcanvas.on("object:modified", dis.modifiedHandler);

            fcanvas.setBackgroundImage(bg, fcanvas.renderAll.bind(fcanvas));
            dis.setOldModificationsToDownload;
            // fcanvas.renderAll();
          });
      });
      return Promise.resolve();
    },
    downloadPdf() {
      this.elementType = 0;
      const dis = this;
      dis.isLoading.downloadingPdf = true;
      const pageData = dis.canvis[dis.currentPage].toDataURL({
        format: "jpeg",
        multiplier: 10
      });
      const pdf = new jsPDF("", "pt", "a4");
      pdf.addImage(pageData, "JPEG", 0, 0, 595.28, 841.89);
      pdf.save(this.file.title);
    }
  },

  watch: {
    // drwSignature(){

    // },
    pdf() {
      this.drawCanvas();
    },
    mods(old, nw) {},
    signatureModal(mew, old) {
      if (mew) {
        const d = this;
        setTimeout(() => {
          d.drawSignatureCanvas();
        }, 3000);
      }

      if (old) {
        $("#signatureCanvas").remove();
      }
    },

    signatureName(mew, old) {
      $("#signatureCanvas").remove();
      this.drawSignatureCanvas();
    }
  },
  computed: {
    ...mapGetters("user_mgt", ["isLoggedIn", "userSignature"]),
    ...mapGetters("pdfFile", ["lastFileFabricObjects", "lastFileID"]),
    visible() {
      return this.open;
    },
    returnSignature() {
      if (this.signatureName.length > 0) {
        return this.signatureName;
      }
      return "John Walker";
    },
    computedName: {
      set() {},
      get() {
        return `${this.toTitleCase(this.user.firstName)} ${this.toTitleCase(
          this.user.lastName
        )}`;
      }
    },

    computedInitial: {
      set() {},
      get() {
        return `${this.toTitleCase(this.user.firstName).charAt(
          0
        )}.${this.toTitleCase(this.user.lastName).charAt(0)}.`;
      }
    },
    computedText: {
      set(val) {
        this.sampleText = this.canvis[this.currentPage].getActiveObject().text;
      },
      get() {
        return this.sampleText;
      }
    },
    ...mapGetters("user_mgt", ["user"]),
    setOldModifications() {
      let hone;
      const dis = this;
      const canvas = this.canvis[this.currentPage];
      const fabric = this.fabricObj;
      const pag = this.currentPage;
      const current = this.mods.filter(e => e.page === pag);
      if (current.length > 0) {
        for (let i = 0; i < current.length; i++) {
          hone = current[i];

          var { cookedData } = hone;
          cookedData.cornerSize = 12;
          cookedData.selectionLineWidth = 5;
          cookedData.cornerStyle = "circle";
          cookedData.transparentCorners = false;
          cookedData.cornerColor = "hsl(141, 71%, 48%)";
          var contentToAdd;
          if (hone.elementType === 1) {
            // Checkmark
            // cookedData
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.737 16.382"><defs><style>.a{fill:none;stroke:#363636;stroke-width:3px;}</style></defs><path class="a" d="M2.314,7.071l7.131,7.3,5.15-5.458,7.292-7.729" transform="translate(-1.241 -0.155)"/></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 2) {
            // Cross

            // cookedData
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24"><defs><style>.a{fill:#363636;font-size:18px;font-family:SegoeUI-Bold, Segoe UI;font-weight:700;letter-spacing:0.03em;}</style></defs><text class="a" transform="translate(6 19)"><tspan x="-5.897" y="0">X</tspan></text></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 3) {
            // Bullet
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><defs><style>.a{fill:#fff;stroke:#363636;stroke-width:2px;}.b{fill:#363636;}.c{stroke:none;}.d{fill:none;}</style></defs><g transform="translate(-790 -628)"><g class="a" transform="translate(790 628)"><circle class="c" cx="10" cy="10" r="10"/><circle class="d" cx="10" cy="10" r="9"/></g><circle class="b" cx="5" cy="5" r="5" transform="translate(795 633)"/></g></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 4) {
            // Highlight
          } else if (hone.elementType === 5) {
            // Date
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "12/19/2018",
              cookedData
            );
          } else if (hone.elementType === 6) {
            // Text
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(hone.elementValue, cookedData);
          } else if (hone.elementType === 7) {
            // Name
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "Your Name",
              cookedData
            );
          } else if (hone.elementType === 8) {
            // signature
            cookedData.padding = 5;
            fabric.Image.fromURL(
              hone.elementValue,
              img => {
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
              },
              cookedData
            );
          } else if (hone.elementType === 9) {
            // Name
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 28;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "Your Initials",
              cookedData
            );
          } else if (hone.elementType === 10) {
            // circle
            cookedData.padding = 10;
            contentToAdd = new fabric.Circle(cookedData);
          } else if (hone.elementType === 11) {
            // small Circle
            cookedData.padding = 10;
            contentToAdd = new fabric.Circle(cookedData);
          } else if (hone.elementType === 12) {
            cookedData.padding = 10;
            cookedData.lockScalingY = true;
            contentToAdd = new fabric.Line(hone.cookedData.points, cookedData);
          } else if (hone.elementType === 13) {
            // Whitening
            cookedData.padding = 10;
            contentToAdd = new fabric.Rect(cookedData);
          } else if (hone.elementType === 14) {
            // Highlight
            cookedData.padding = 10;
            contentToAdd = new fabric.Rect(cookedData);
          }
          if (contentToAdd) {
            this.canvis[this.currentPage].add(contentToAdd);
            this.canvis[this.currentPage].setActiveObject(contentToAdd);
          }
        }
      }
    },
    setOldModificationsToDownload() {
      let hone;
      const dis = this;
      const canvas = this.canviToDownload;
      const fabric = this.fabricObj;
      const pag = this.currentPage;
      const current = this.mods.filter(e => e.page === pag);
      if (current.length > 0) {
        for (let i = 0; i < current.length; i++) {
          hone = current[i];
          var { cookedData } = hone;
          cookedData.cornerSize = 12;
          cookedData.selectionLineWidth = 5;
          cookedData.cornerStyle = "circle";
          cookedData.transparentCorners = false;
          cookedData.cornerColor = "hsl(141, 71%, 48%)";
          var contentToAdd;
          if (hone.elementType === 1) {
            // Checkmark
            // cookedData
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.737 16.382"><defs><style>.a{fill:none;stroke:#363636;stroke-width:3px;}</style></defs><path class="a" d="M2.314,7.071l7.131,7.3,5.15-5.458,7.292-7.729" transform="translate(-1.241 -0.155)"/></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 2) {
            // Cross

            // cookedData
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24"><defs><style>.a{fill:#363636;font-size:18px;font-family:SegoeUI-Bold, Segoe UI;font-weight:700;letter-spacing:0.03em;}</style></defs><text class="a" transform="translate(6 19)"><tspan x="-5.897" y="0">X</tspan></text></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 3) {
            // Bullet
            cookedData.padding = 10;
            fabric.loadSVGFromString(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><defs><style>.a{fill:#fff;stroke:#363636;stroke-width:2px;}.b{fill:#363636;}.c{stroke:none;}.d{fill:none;}</style></defs><g transform="translate(-790 -628)"><g class="a" transform="translate(790 628)"><circle class="c" cx="10" cy="10" r="10"/><circle class="d" cx="10" cy="10" r="9"/></g><circle class="b" cx="5" cy="5" r="5" transform="translate(795 633)"/></g></svg>',
              (objects, options) => {
                const shape = fabric.util.groupSVGElements(objects, options);
                shape.set(cookedData);

                canvas.add(shape);
                canvas.setActiveObject(shape);
                canvas.calcOffset();
              }
            );
          } else if (hone.elementType === 4) {
            // Highlight
          } else if (hone.elementType === 5) {
            // Date
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "12/19/2018",
              cookedData
            );
          } else if (hone.elementType === 6) {
            // Text
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(hone.elementValue, cookedData);
          } else if (hone.elementType === 7) {
            // Name
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 24;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "Your Name",
              cookedData
            );
          } else if (hone.elementType === 8) {
            // signature
            cookedData.padding = 5;
            fabric.Image.fromURL(
              hone.elementValue,
              img => {
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
              },
              cookedData
            );
          } else if (hone.elementType === 9) {
            // Name
            cookedData.padding = 10;
            cookedData.fill = "#000";
            cookedData.fontSize = 28;
            cookedData.selectable = true;
            contentToAdd = new fabric.IText(
              hone.elementValue || "Your Initials",
              cookedData
            );
          } else if (hone.elementType === 10) {
            // circle
            cookedData.padding = 10;
            contentToAdd = new fabric.Circle(cookedData);
          } else if (hone.elementType === 11) {
            // small Circle
            cookedData.padding = 10;
            contentToAdd = new fabric.Circle(cookedData);
          } else if (hone.elementType === 12) {
            contentToAdd = new fabric.Line(hone.cookedData.points, cookedData);
          } else if (hone.elementType === 13) {
            // Whitening
            cookedData.padding = 10;
            contentToAdd = new fabric.Rect(cookedData);
          } else if (hone.elementType === 14) {
            // Highlight
            cookedData.padding = 10;
            contentToAdd = new fabric.Rect(cookedData);
          }
          if (contentToAdd) {
            this.canviToDownload.add(contentToAdd);
            this.canviToDownload.setActiveObject(contentToAdd);
            // return Promise.resolve(contentToAdd)
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@material/elevation/mdc-elevation";

.icon {
  border-radius: 50%;
}

.icon img {
  border-radius: 50%;
  background-color: hsl(141, 71%, 48%);
  width: 32px;
  height: 32px;
}

.zoomArea {
  cursor: pointer;
  position: fixed;
  right: 1em;
  bottom: 1em;
  // background-color: hsl(141, 71%, 48%);
  // padding: 1em;
  width: 50px;
  z-index: 9999999999;
}

.flex-div {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.drw-area {
  flex: 1;
}

.editing-area {
  width: 150px;
  background-color: #ffffff;
}

p {
  color: #363636;
  cursor: default;
}

.sig-img {
  width: 70px;
}

.sig-edit {
  color: #4caf50;
  cursor: pointer;
  font-size: 15px;
  text-shadow: 1px 1px 1px #000000;
}

#signature {
  display: inline-block;
  width: unset !important;
  padding: 8px 12px;
  position: relative;
  top: -14px;
  text-shadow: 1px 1px 1px #000000;
  cursor: pointer;
}

.open-mode {
  display: inline-block;
  position: relative;
  height: 40px !important;
}

.sig-modal {
  width: 200px;
  height: 120px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  top: -130px;
  left: -50%;
  box-shadow: 0px 0px 10px #000000;
  box-sizing: border-box;
  cursor: default;
}

.clear-sig {
  color: #4caf50;
  cursor: pointer;
}

.save-sig {
  width: 25px;
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
}

#sig-canvas {
  /* width: 100%;
       height: 59px; */
}

.sig-line {
  width: 100%;
  height: 1px;
  background-color: #000000;
}

.del-sig {
  position: absolute;
  bottom: 23px;
  left: 5px;
  cursor: pointer;
}

#pdf-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

#intro-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.editor-menu-header {
  background-color: unset !important;
  height: 50px;
}

.edit-btn {
  width: 40px !important;
}

.editor-menu-header button {
  border: none !important;
  box-shadow: none !important;
}

#drawingArea {
  height: 80%;
  overflow-y: scroll;
  overflow-x: scroll;
  background: #fff;
  max-width: 85%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14);
}

.olf:hover::-webkit-scrollbar {
  width: 5px;
  transition: all 1s ease;
}

.olf::-webkit-scrollbar {
  width: 0px;
  transition: all 1s ease;
}

.olf::-webkit-scrollbar-thumb {
  border-radius: 2px !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5) !important;
  background-color: green;
  transition: all 1s ease;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.olf::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1) !important;
  border-radius: 50px;

  transition: all 1s ease;
}

a {
  font-weight: normal;
  color: #76c45f;
}

a:hover {
  text-decoration: underline;
}

footer {
  position: fixed;
  background: #76c45f;
  bottom: 0;
  width: 100%;
  text-align: center;
}

footer p,
footer a {
  color: white;
  font-size: 0.8rem;
  margin-left: 3px;
  margin-right: 3px;
}

.editor-top-wrapp button,
.editor-menu button {
  color: #363636;
  background: white;
  border: 1px solid #c9c7c7;
  border-radius: 5px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.editor-top-wrapp button:hover,
.editor-menu button:hover {
  border: 1px solid #363636;
}

.editor-wrapp {
  display: grid;
  background: white;
  grid-template-columns: 1fr;
  grid-template-rows: 0.08fr 1fr;
  height: 100vh;
  width: 100%;
  margin: 0;
}

.editor-top-wrapp {
  max-height: 300px;
}

.editor-top-wrapp button {
  width: 150px;
  height: 40px;
  margin-top: 20px;
  font-weight: lighter;
}

.editor-top-wrapp button:first-child {
  margin-left: 17.5%;
}

.editor-inner-wrapp {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.el-dialog__header {
  padding: 30px 20px !important;
}

.paper {
  background: #e8e8e8;
}

.p-comment {
  font-size: 1.1rem;
  width: 85%;
  margin: 0 auto;
  text-align: center;
  font-weight: lighter;
}

/* .editor-menu{

    } */
.editor-menu button,
.editor-menu div div button {
  font-weight: bold;
  width: 90px;
  padding: auto 5px;
  height: 40px;
  margin-bottom: 10px;
}

.editor-menu div div #signature,
.editor-menu div div #initials {
  position: absolute;
  height: 0;
  width: 0;
}

.editor-menu div div:hover #signature,
.editor-menu div div:hover #initials {
  height: 150px;
  width: 400px;
  background: white;
  border: 1px solid #c9c7c7;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.editor-menu div div:hover #signature {
  background: white url("./images/sign_here.svg");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
}

.editor-menu div div:hover #signature,
.editor-menu div div:hover #initials {
  margin: 0;
  left: 62%;
  z-index: 99999;
}

.editor-menu div div:hover input {
  width: 350px;
  height: 40px;
  margin: 70px 20px;
  padding: 2.5px 5px;
  border: 1px solid #c9c7c7;
  color: #363636;
  border-radius: 5px;
  font-size: 1.05rem;
  text-align: center;
}

.editor-menu div div #initials input {
  position: absolute;
  display: none;
}

.editor-menu div div:hover #initials input {
  display: block;
}

.editor-menu div div #signature-underline {
  position: absolute;
  display: none;
  background: url("./images/sign_here.png");
  width: 276px;
  height: 38px;
  margin: 35px 0 0 -60px;
}

.editor-menu div div:hover #signature-underline {
  display: block;
}

.editor-menu div div:hover #confirm-signature,
.editor-menu div div:hover #confirm-initials {
  position: absolute;
  height: 25px;
  width: 25px;
  margin: -40px 0 0 0;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zd�lMMTMsMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTY5NS41IDYzMi41KSIvPjwvZz48L3N2Zz4=);
  left: 90.4%;
  z-index: 9999999;
}

.editor-menu div div:hover #confirm-signature:hover,
.editor-menu div div:hover #confirm-initials:hover {
  box-shadow: 0 0 2px 1px #76c45f, 0 0 2px 1px #76c45f inset;
  border-radius: 50%;
}

.editor-menu div a {
  position: absolute;
  display: block;
  margin: -45px 150px 0;
}

#checkmark {
  background: url("./images/Checkmark.svg");
  background-size: 25px;
}

#cross {
  background: url("./images/Cross.svg");
  background-size: 15px;
}

#bullet {
  background: url("./images/Bullet.svg");
  background-size: 20px;
}

#checkmark,
#cross,
#bullet {
  background-repeat: no-repeat;
  background-position: center center;
}

#highlight {
  color: #d4d400;
}

.top-bar.top-bar-tablet,
.top-bar.top-bar-mobile {
  position: fixed;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0px 8px 0px #e1e1e1;
}

#canvasSizer {
  margin-top: 85px !important;
}

@media (min-width: 1024px) {
  #drawingArea {
    max-width: 969px;
  }
}

@media (max-width: 1440px) {
  .editor-top-wrapp button:first-child {
    margin-left: 21.5%;
  }
}

@media (max-width: 500px) {
  .canvas-container {
    left: -50px !important;
  }
}

@media (max-width: 1366px) {
  .editor-top-wrapp button:first-child {
    margin-left: 20%;
    margin-bottom: 10px;
  }
}

@media (max-width: 1280px) {
  .editor-top-wrapp button:first-child {
    margin-left: 17.6%;
  }
}

@media (max-width: 1199px) {
  .editor-menu button,
  .editor-menu div div button {
    width: 70px;
  }
  .editor-menu {
    font-size: 10px;
  }
  .p-comment {
    font-size: 10px;
    width: 100%;
  }
  .editor-top-wrapp button:first-child {
    margin: 0 0 10px;
  }
  .paper {
    background: #e8e8e8;
  }
}

@media (max-width: 767px) {
  .editing-area {
    width: 100%;
  }

  .editor-menu div a {
    margin: 0;
  }
  .editor-top-wrapp button {
    height: 35px;
    font-size: 10px;
    padding: 0 5px;
    width: auto;
  }
  .editor-inner-wrapp {
    display: block;
    grid-template-columns: initial;
  }
  .paper {
    max-width: 100%;
  }
  .editor-menu button,
  .editor-menu div div button {
    width: 120px;
  }
  .editor-menu {
    margin: 30px 0 0 0;
    display: block;
    grid-template-columns: auto;
  }
  #highlight {
    vertical-align: top;
  }
  .editor-menu div {
    display: inline-block;
  }
  .el-dialog__body section {
    padding: 0;
  }
  .editor-menu div div:hover #signature,
  .editor-menu div div:hover #initials {
    margin: 0 auto;
    left: 0;
    z-index: 99999;
    width: 80%;
    right: 0;
  }
  .editor-menu div div:hover input {
    width: 85%;
    margin: 55px 20px;
  }
}
</style>
