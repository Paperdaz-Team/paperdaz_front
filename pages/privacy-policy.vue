<template>
  <!-- Card close -->
  <div class="card p-5 shadow">
    <div
      @click="$router.back()"
      class="card-close-btn">
      <span>
        <i class="fas fa-times" />
      </span>
    </div>

    <!-- Card content -->
    <h2 class="pt-3 pl-3">
      Privacy Policy
    </h2>
    <div
      class="card-body olf"
      style="max-height: 500px; overflow-y: scroll; text-align: justify;">
      <h2>INTRODUCTION</h2>

      The primary objective of this Privacy Policy Statement is to keep you
      informed about the practices of Paperdaz.
      The Privacy Policy relates to what information are submitted by or
      collected from the Users and how such information may be used, shared and
      stored.
      Paperdaz is the manager of all information. Paperdaz is also in charge of
      processing your personal information.
      <h2>EU GDPR COMPLIANCE STATEMENT</h2>

      The policy explained below is binding according to the English and US Laws
      and including that which is a mandatory requirement for the EU General
      Data Protection Regulation (GDPR).
      In compliance with the requirements of the law, we enlighten you on your
      rights and our duties when it concerns the use and control of your
      information.
      We do not disclose, share or sell any information collected from Users
      through our Service to any third party except as specified and detailed in
      this Privacy Policy.
      In compliance with GDPR guidelines, Paperdaz is the “data processor,” and
      our Users are “data controllers.” Our Users are responsible for accepting
      information gathering requirements and meeting up with other privacy
      requirements for each User.
      We have built our Service in a manner that secures the privacy of our
      esteemed Users regarding their detail. We respect and value our User’s
      right to privacy.
      <h2 class="mt-2">
        INFORMATION THAT WE COLLECT
      </h2>

      Personally Identifiable Information (PII) that we collect from individual
      Users are stated below:
      Information That You Submits: Upon your visit and using our website, or
      whenever we may collect information like your Email, Business name,
      Address, Country, First name, last name, phone number and other
      information as requested.

      Communication Information: you acknowledge and agree that we may request
      for details of your communications or interactions when you contact our
      customer care team. These interactions or communications are recorded for
      the singular purpose of evaluation and training. This is to enhance and
      improve the quality of our Service delivery to you. You agree that any
      material you shared are processed along with what other users submitted.
      <h3 class="mt-1">
        Information We Automatically Collect
      </h3>

      Our applicable third-party service providers and us will automatically
      collect information which may generally include your device Internet
      Protocol (IP) address, browser details, internet service provider (ISP),
      device operating system, and platform type.
      We may also involve the use of one or more cookies that may uniquely
      identify your account or browser, and date and time stamp from your
      browsing device and its software anytime you access or use the Service.
      You need to accept the use of cookies for you to have full access to the
      Service. Some browsers have been enabled automatically accepts cookies.
      Such can be disabled through the browser settings. Appropriate preference
      about cookies can be selected from the browser setting.
      We may also collect “Usage Data” which consist of information about your
      activity on and usage of the Service and the Services.
      Information about service usage: we may collect details about your
      navigations and through the Service. The details collected may consist of
      information such as the pages you viewed, how you navigate through the
      service and its insights.
      Information about your location: presently, we do not obtain information
      about your actual geographical location or corresponding coordinates, but
      we may collect such information in the future but not without your prior
      consent. Information such as the IP address that we harvested from Users
      can be used from time to time to estimate or evaluate a device’s location.
      Third party information: you accept and agree that we may collect some
      information that pertains to your use of our website, this information may
      be collect too. Appropriate third party agents may supply us with contact
      details, internet navigation details (which ascertains whether you are a
      robot or not through the way you navigate through the Service),
      information that checkmates fraud and partnering with financial
      institutions will also relay to us all transaction information and methods
      relating to the subscription or paid services that you use on the Service.
      You acknowledge and consent appropriately, that the Personal information
      gathered from your usage of our website may be linked with the information
      collected automatically from your browser and device. This is done given
      providing you with personalized and satisfactory experience
      notwithstanding your relations with us.
      <h2 class="mt-2">
        OUR COOKIE POLICY
      </h2>

      When you are visiting or accessing our Service for the first time, we will
      ask if you wish to allow the use of cookies on your browsing device. Users
      are permitted to choose to allow or disallow the use of cookies, and we
      may not use cookies on your first visit to the Service except for
      recording that you did not allow the use of cookies or for other such
      purposes. You consent that you will not be able to effectively use all the
      features and functions on our Service if you disable or disallow the usage
      of cookies on your browser or if you deactivate it from your browser
      settings.

       <h2 class="mt-2">
        DATA SECURITY
      </h2>

      We have put in place adequate security measures to safeguard against
      misplacement, abuse, and tampering of information stored in our database.
      We engage the use of the appropriate level of care and control to ensure
      that we provide a secure transfer of data between your device and our
      servers. As a result, it is known that the transmission of data through
      the internet is not guaranteed to be 100% safe and secure. Hence, we will
      not be to ascertain the absolute security of any data transmitted through
      the internet. Therefore, we do not accept liability of such unintended
      disclosure.
      <h2 class="mt-2">
        THIRD PARTY LINKS
      </h2>

      Periodically, our Service may contain some third-party website links. If
      you chose to click or follow the provided link, in your sole discretion,
      please be notified that these websites or links have their privacy
      practices and policy. Therefore, we cannot be held responsible for the
      efficiency of such policies on the websites or links. Hence, you are
      advised to read their privacy policies and practices before you submit any
      personal information to the websites and links.
      <h2 class="mt-2">
        MODIFICATION TO THIS PRIVACY POLICY
      </h2>

      You consent that we may modify, update or change this Privacy Policy
      document as we consider necessary, in our exclusive discretion. Similarly,
      periodic revisions will be carried out on this document. The User is
      admonished to review this Privacy Policy document regularly.
      Modifications, updates or revisions are considered effective once they
      have been published on this page.
    </div>
  </div>
  <!-- Card ligin end-->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  layout: 'default',
  data() {
    return {};
  },
  head: {
    title: 'Terms and Conditions',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  mounted() {

  },
  methods: {
    ...mapActions('auth', ['login']),
  },
  computed: {},
};
</script>


<style scoped>
  .fb-btn {
    background: #4267B2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .social-btn {
    width: 100%;
    border: 1px solid #53A63E !important;
    text-align: left !important;
    padding: 0px 15px !important;
    font-weight: 700 !important;
    height: 40px;
  }

  .btn-blockc {
    width: 100%;
    background: #53A63E;
    color: #FFFFFF;
    font-weight: 700 !important;
  }

  .btn-blockc:hover {
    color: #fff !important;
  }


  .form-controlc {
    background: #ECECEC !important;
    color: #5C5D5F !important;
    font-weight: 700;
  }

  .colorwhite {
    color: #FFFFFF;
  }

  a, a:hover {
    text-decoration: none;
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
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
  }

  .olf::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1) !important;
    border-radius: 50px;

    transition: all 1s ease;
  }

  .card-close-btn {
    position: absolute;
    right: 50px;
    font-size: 20px;
    cursor: pointer;
  }
</style>
