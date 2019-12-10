<template>
  <div>
    <v-tabs
      :hide-slider="true"
      v-model="active">
      <v-tab
        ripple
        style="text-transform: capitalize !important;">
        Profile
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <b-profile />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab
        ripple
        style="text-transform: capitalize !important;">
        Billing
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <b-bills />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script type="text/javascript">
import profile from '@/components/business/profile';
import teams from '@/components/business/teams';
import billings from '@/components/business/billings';


export default {
  layout: 'business-layout',
  fetch({ store, redirect }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];

    if (!userIsLoggedIn) {
      return redirect('/login');
    }
  },
  components: {
    bProfile: profile,
    bTeams: teams,
    bBills: billings,
  },
  head: {
    title: 'Account',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    if (this.$route.query.page) {
      this.active = Number(this.$route.query.page);
    } else {
      this.active = 0;
    }
  },
};

</script>


<style type="text/css">
  .v-tabs__item--active {
    color: #51c732 !important;
  }

  .theme--light {
    background: transparent !important;
  }

  .v-tabs__item {
    font-size: 16px;
  }

  @media (max-width: 991px) {
    .theme--light.v-tabs__bar .v-tabs__div {
      margin-left: 9px;
    }
  }

  @media (max-width: 767px) {
    .v-tabs__wrapper {
      display: inline-block;
      position: absolute;
      top: -45px;
      left: 50px;
    }
  }

</style>
