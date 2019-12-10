<template>
  <d-card class="card-small mb-4">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">
        {{ title }}
      </h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form>
              <d-form-row>
                <!-- First Name -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="feFirstName">First Name</label>
                  <d-form-input
                    :disabled="true"
                    id="feFirstName"
                    placeholder="First Name"
                    type="text"
                    v-model="accountData.firstName" />
                </d-col>

                <!-- Last Name -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="feLastName">Last Name</label>
                  <d-form-input
                    :disabled="true"
                    id="feLastName"
                    placeholder="Last Name"
                    type="text"
                    v-model="accountData.lastName" />
                </d-col>
              </d-form-row>

              <d-form-row>
                <!-- Email -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="feEmail">Email</label>
                  <d-form-input
                    :disabled="true"
                    id="feEmail"
                    placeholder="Email Address"
                    type="email"
                    v-model="accountData.email" />
                </d-col>

                <!-- Password -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="fePassword">Password</label>
                  <d-form-input
                    :disabled="true"
                    id="fePassword"
                    placeholder="password"
                    type="password" />
                </d-col>
              </d-form-row>

              <d-form-row>
                <!-- Country -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="feInputCity">Country</label>
                  <d-form-input
                    :disabled="true"
                    id="feInputCity"
                    placeholder="Country"
                    type="text"
                    v-model="accountData.country" />
                </d-col>

                <!-- Registered At -->
                <d-col
                  class="form-group"
                  md="6">
                  <label for="inputZip">Registered At</label>
                  <input
                    :disabled="true"
                    :value="new Date(accountData.date_created).toLocaleDateString()"
                    class="form-control"
                    id="inputZip"
                    type="text">
                </d-col>
              </d-form-row>

              <d-button
                class="btn-accent"
                disabled
                type="submit">
                Update Account
              </d-button>
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </d-card>
</template>

<script>
export default {
  name: 'UserAccountDetails',
  props: {
    /**
       * The component title.
       */
    title: {
      type: String,
      default: 'Account Details',
    },
    /**
       * The component form values
       */
    accountData: {
      type: Object,
      required: true,
    },
  },
};
</script>
