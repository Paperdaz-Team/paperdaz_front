<template>
  <div>
    <div class="mx-auto col-lg-6">
      <h4>{{ file.title }}</h4>
      <table class="table scrollable-table">
        <thead>
          <tr>
            <th>Request Made By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in file.list">
            <td>{{ user.firstName+' '+user.lastName }}</td>
            <td>
              <b-dropdown
                no-caret
                size="lg"
                variant="link">
                <template slot="button-content">
                  <i
                    class="fa fa-ellipsis-h"
                    style="" />
                </template>
                <b-dropdown-item
                  @click.prevent="updateState(true, user.Id)"
                  href="#">
                  Grant Request
                </b-dropdown-item>
                <b-dropdown-item
                  @click.prevent="updateState(false, user.Id)"
                  href="#">
                  Decline Request
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
          <tr v-if="file.list.length === 0">
            <td
              class="text-center"
              colspan="2">
              No Requests for this file
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  layout: 'business-layout',
  components: {},
  head: {
    title: 'Access Requests',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  data() {
    return {};
  },
  mounted() {
    this.getSingleFile();
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFile', 'update']),
    ...mapMutations('files', ['addGranted', 'removeRequests']),
    getSingleFile() {
      this.callWithToken({
        parameters: {
          name: this.$route.params.id,
        },
        action: this.getFile,
      }).then((success) => {

      });
    },

    updateState(status, user) {
      // debugger;
      const req = this.file.access_requests;
      const granted = this.file.access_granted;
      const g = {
        user,
        actor: this.user.Id,
      };
      if (status) {
        this.addGranted(g);
      } else {
        this.removeRequests(g);
      }

      this.callWithToken({
        parameters: {
          file: this.file,
        },
        action: this.update,
      }).then((success) => {
        this.getSingleFile();
      });
    },
  },
  computed: {
    ...mapGetters('files', ['file']),
    ...mapGetters('user_mgt', ['user']),
    mappedFile() {
      return this.file;
    },
  },
};
</script>

<style>
  .fa-ellipsis-h{
  color: #53A63E;
  }
</style>
