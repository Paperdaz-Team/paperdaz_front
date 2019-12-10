<template>
  <section>
    <p-header />
    <div class="get-in-touch">
      <div class="get-in-touch-bg">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2>Get In Touch</h2>
              <p>
                Let's keep our world Green. We'd love to hear from you <br>
                Here's how to reach us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="container">
        <div id="contact">
          <div class="row">
            <div class="col-md-8">
              <div class="contact-form">
                <h3>Send us a Message</h3>
                <div class="row">
                  <div class="col-md-6">
                    <label for="name">Your name</label> <br>
                    <input
                      name="name"
                      placeholder="Albert perera"
                      type="text">
                  </div>
                  <div class="col-md-6">
                    <label for="email">Your email address</label> <br>
                    <input
                      name="email"
                      placeholder="your email@gmail.com"
                      type="text">
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label for="number">Your Contact number</label> <br>
                    <input
                      name="number"
                      placeholder="xxx-xxx-xxxx"
                      type="text">
                  </div>
                  <div class="col-md-6">
                    <label for="Company">Company</label> <br>
                    <input
                      name="Company"
                      placeholder="Company"
                      type="text">
                  </div>
                </div>

                <label for="name">Message</label> <br>
                <textarea
                  cols="60"
                  rows="3" />
                <input
                  type="submit"
                  value="SEND">
              </div>
            </div>
            <div class="col-md-4">
              <div class="contact-address">
                <div class="contact-text">
                  <h3>Contact Informations</h3>
                </div>
                <ul class="text-c">
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <i class="fa fa-map-marker" />
                      </div>
                      <div class="col-10">
                        10121 SE Sunnyside Rd,<br>
                        Clackamas OR 97015
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <i class="fa fa-mobile" />
                      </div>
                      <div class="col-10">
                        <a href="tel:547.357.6838">547.357.6838</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <i class="fa fa-clock" />
                      </div>
                      <div class="col-10">
                        Office Hours 9am to 5pm PST
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <i class="fa fa-envelope" />
                      </div>
                      <div class="col-10">
                        <a href="mailto:info@paperdaz.com">info@paperdaz.com</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <i class="fa fa-comments" />
                      </div>
                      <div class="col-10">
                        Let’s Chat!
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- <div class="social">
                               <div class="row">
                                   <div class="co-6">Stay Connected</div>
                                   <div class="co-6">
                                       <ul>
                                            <li><i class="fa fa-comments"></i></li>
                                            <li><i class="fa fa-comments"></i></li>
                                            <li><i class="fa fa-comments"></i></li>
                                            <li><i class="fa fa-comments"></i></li>
                                        </ul>
                                   </div>
                               </div>
                            </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-footer />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import header from '@/components/header';
import footer from '@/components/footer';

export default {
  layout: 'complete',
  components: {
    pHeader: header,
    bFooter: footer,
  },
  data() {
    return {};
  },
  head: {
    title: 'Contact',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: 'Paperdaz, Let us go green!!! ',
      },
    ],
  },
  methods: {
    ...mapActions('auth', ['recover_password']),

  },
  mounted() {

  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'loading', 'user']),
  },
};
</script>

<style>
  @import "../assets/css/contact-page.css";
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
</style>
