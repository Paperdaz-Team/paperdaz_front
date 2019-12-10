<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    title="Send Request"
    v-if="dialogVisible">
    <div class="container">
      <div class="form-group">
        <label>Email</label>
        <div class="pull-right text-warning">
          <i
            @click="addAnother"
            class="ml-3 fa fa-plus pointer"> <span>Add another email </span> </i>
        </div>
        <el-input
          :key="item"
          class="mb-1"
          name="email"
          placeholder="example@mail.com"
          type="email"
          v-for="item in emails"
          v-model="sendTo[item-1]"
          v-validate="'email'">
          <template
            slot="append"
            v-if="errors.has('email')">
            <i class="fa fa-times" />
          </template>
        </el-input>
      </div>
      <div class="form-group">
        <label>Add Note</label>
        <el-input
          :rows="5"
          placeholder="Add Note Here"
          type="textarea"
          v-model="notes" />
      </div>
    </div>
    <span
      class="dialog-footer"
      slot="footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button
        @click="sendRequest"
        class="btn btn-blockc header-btn shadow login-btn">Confirm</el-button>
    </span>
  </el-dialog>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['send', 'file'],
  data() {
    return {
      emails: 1,
      sendTo: [],
      notes: '',
      selectedFiles: [],
    };
  },
  computed: {
    dialogVisible() {
      return this.send;
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('files', ['files', 'error', 'loading', 'pages', 'page', 'message', 'total']),
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getCompanyFiles', 'sendReq']),
    addAnother() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.sendTo.push(this.email);
          // this.email = '';
          this.emails = this.emails + 1;
        }
      });
    },
    sendRequest() {
      this.$validator.validateAll().then((result) => {
        if (result || this.sendTo.length > 0) {
          if (!result) {
            this.sendTo.splice(this.emails - 1, 1);
          }
          this.selectedFiles.push(this.file._id);
          this.callWithToken({
            parameters: {
              files: this.selectedFiles,
              recipients: this.sendTo,
              note: this.notes,
              business: this.user.businessName,
            },
            action: this.sendReq,
          }).then((success) => {
            if (success.success) {
              this.selectedFiles = [];
              this.sendTo = [];
            }
            this.$message({
              message: success.message,
            });
            this.emails = 1;
          });
        }
      });
    },
  },
};
</script>

<style scoped type="text/css">
  .login-btn {
    background: #53A63E;
    border: 1px solid #53A63E;
    color: #fff !important;
  }

  .container {
    padding: 0 24px;
  }

  .pointer {
    color: #53A63E;
  }

  .pointer span {
    color: #53A63E;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin-left: 5px;
  }

  input {
    background: #eee;
  }

  button.el-button.el-button--default {
    color: #53A63E;
    border-color: #53A63E;
  }
</style>
