<template>
  <section>
    <div class="row">
      <div class="col-lg-10" />
      <div class="col-lg-2 pull-right">
        <button
          @click="openNew = true"
          class="btn btn-success pull-right">
          Add FAQ
        </button>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Frequently Asked Questions
          </h4>
          <p class="card-category">
            Here is a list of available FAQs
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="">
                <th />
                <th>
                  ID
                </th>
                <th>
                  Question
                </th>
                <th>
                  Answer
                </th>
                <th>
                  Category
                </th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in faqs">
                  <td>
                    <b-form-checkbox
                      :unchecked-value="-2"
                      :value="index"
                      v-model="selected" />
                  </td>
                  <td>
                    {{ index+1 }}
                  </td>
                  <td>
                    {{ item.question }}
                  </td>
                  <td>
                    {{ item.answer }}
                  </td>
                  <td>
                    {{ readCat(item.category) }}
                  </td>
                </tr>
                <tr v-if="faqs.length === 0">
                  <td
                    class="text-center"
                    colspan="4">
                    No FAQs Yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-7" />
            <div class="col-lg-5 pull-right">
              <button
                :disabled="selected === -2"
                @click="deleteItem"
                class="btn btn-success pull-right">
                Delete
              </button>
              <button
                :disabled="selected === -2"
                @click="openEdit = true"
                class="btn btn-success pull-right">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <n-faq
      :open="openNew"
      @close="closeNew"
      @save="saveItem"
      v-if="openNew" />
    <e-faq
      :item="selectedItem"
      :open="openEdit"
      @close="closeEdit"
      @save="saveItem"
      v-if="openEdit" />
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import new_faq from '@/components/shared/newFaq';
import edit_faq from '@/components/shared/editFaq';

export default {
  meta: { requiresAuth: true },
  layout: 'super_layout',
  head: {
    title: 'FAQs',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  components: { nFaq: new_faq, eFaq: edit_faq },
  data() {
    return {
      openNew: false,
      openEdit: false,
      selected: -2,
    };
  },
  methods: {
    ...mapActions('faq', ['fetchFaqs', 'createFaqs', 'deleteFaqs']),
    ...mapActions('user_mgt', ['callWithToken']),
    fetchAll() {
      this.callWithToken({
        parameters: {},
        action: this.fetchFaqs,
      }).then((success) => {
        console.log();
      });
    },
    closeNew() {
      this.openNew = false;
    },
    closeEdit() {
      this.openEdit = false;
    },
    deleteItem() {
      if (this.selected   !==   -2) {
        this.callWithToken({
          parameters: {
            id: this.faqs[this.selected]._id,
          },
          action: this.deleteFaqs,
        }).then((success) => {
          this.selected = -2;
          this.fetchAll();
        });
      }
    },

    editItem() {

    },
    readCat(cat) {
      if (Number(cat) === 0) {
        return 'General';
      } if (Number(cat) === 1) {
        return 'Business';
      } if (Number(cat) === 2) {
        return 'User';
      }
    },
    saveItem(faq) {
      this.callWithToken({
        parameters: {
          faq,
        },
        action: this.createFaqs,
      }).then((success) => {
        if (success.success) {
          this.$message({
            message: success.message,
            type: 'success',
          });
          this.fetchAll();
          this.closeNew();
          this.closeEdit();
        } else {
          this.$message({
            message: success.message,
            type: 'error',
          });
        }
      });
    },

  },
  mounted() {
    this.fetchAll();
  },
  computed: {
    ...mapGetters('faq', ['faqs']),
    selectedItem() {
      if (this.selected   !==   -2) {
        return this.faqs[this.selected];
      }
      return null;
    },
  },
};
</script>
