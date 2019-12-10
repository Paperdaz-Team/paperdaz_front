<template>
  <div
    class="col-md-12"
    v-if="addmember">
    <div class="text-right py-2">
      <base-button
        @click="clickmember"
        class="is-outlined-success has-bg-white mdc-button--outlined">
        Add Team
      </base-button>
      <!-- <a class="btn btn-blockc shadow login-btn btn_add_team" @click="clickmember">
        <span>Add Team</span>
      </a> -->
    </div>
    <table class="table table-responsive-md">
      <thead>
        <tr>
          <th scope="col">
            Created
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col">
            Uploaded
          </th>
          <th scope="col">
            Completed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="index"
          style="vertical-align: middle;"
          v-for="(member, index) in team_mates">
          <th scope="row">
            {{ $readableTime(member.date_created) }}
          </th>
          <td>{{ member.email }}</td>
          <td>{{ member.firstName+' '+member.lastName }}</td>
          <td>{{ member.position }}</td>
          <td>{{ member.uploaded }}</td>
          <td>{{ member.completed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="col-md-12 text-center"
    v-else>
    <section id="cuponcodea">
      <div class="text-right py-2">
        <base-button
          @click="clickmember"
          class="is-outlined-success has-bg-white mdc-button--outlined">
          Go back
        </base-button>
      </div>
      <div
        class="shadow"
        id="cuponcode"
        v-loading="loading">
        <p class="py-3">
          An email will be sent to the team member to create a
          profile.
        </p>
        <div class="form-group py-3">
          <input
            class="form-control form-controlc"
            name="email"
            placeholder="Email"
            type="email"
            v-model="email"
            v-validate="'required|email'">
          <p
            class="text-right text-danger"
            v-if="errors.has('email')">
            {{ errors.first('email') }}
          </p>
        </div>
        <input
          @click="sendInvite"
          class="btn btn-blc btn_send"
          type="submit"
          value="Send">
      </div>
    </section>
  </div>
</template>
<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  name: 'TeamsComponent',
  components: {
    BaseButton,
  },
  data() {
    return {
      addmember: true,
      email: '',
    };
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('team', ['getTeam', 'invite']),
    clickmember() {
      this.addmember = !this.addmember;
    },

    sendInvite() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.callWithToken({
            parameters: {
              email: this.email,
            },
            action: this.invite,
          }).then((finished) => {
          });
        } else {
          this.$message({
            message: 'Email is required',
            type: 'warning',
            showClose: true,
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters('user_mgt', ['user']),
    ...mapGetters('team', ['team_mates', 'loading', 'error', 'errorMsg']),
  },
  mounted() {
    this.callWithToken({
      parameters: {
        page: 1,
      },
      action: this.getTeam,
    }).then((finished) => {
    });
  },
};
</script>

<style scoped>
  /*@import './../../cssm/var.css';*/
  .page-item {
    margin: 0px 5px;
  }

  a {
    color: #53a63e !important;
  }

  .login-btn {
    background: #fff;
    border: 1px solid #53a63e;
    color: #53a63e !important;
  }

  p {
    color: #53a63e;
    font-weight: 600;
  }

  #cuponcode {
    background: rgba(245, 245, 245, 0.92) !important;
    padding: 40px;
    position: relative;
    z-index: 4;
    max-width: 550px;
    border-radius: 10px;
    margin-left: 20%;
    margin-top: 100px;
  }

  #cuponcodea {
    min-height: 400px;
    position: relative;
  }

  .btn_add_team {
    max-width: 110px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding: 0;
  }

  .btn_add_team span {
    font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .form-control {
    border-radius: 0;
    box-shadow: none;
    border-color: #d2d6de;
    height: 45px !important;
    line-height: 45px !important;
    border-radius: 4px !important;
  }

  p {
    font-weight: normal;
    font-size: 16px;
  }

  .btn_send {
    font-weight: 400 !important;
    max-width: 110px;
    width: 100%;
  }

  @media (max-width: 1440px) {
    #cuponcode {
      margin-left: 10%;
    }
  }

  @media (max-width: 991px) {
    #cuponcode {
      margin: 100px auto 0;
    }

    .btn_add_team {
      line-height: 34px;
    }
  }

  @media (max-width: 767px) {
    .table > thead > tr > th,
    .table > tbody > tr > td {
      font-size: 12px;
    }

    .col-md-12 {
      padding: 0;
    }
  }
</style>
