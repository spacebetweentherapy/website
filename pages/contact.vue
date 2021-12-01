<template>
  <div class="page">
    <PageContent>
      <section class="content contact-details">
        <div class="content-main contact-options">
          <ul>
            <li><ResponsiveImage asset-id="62rXvksqqpbAiheFLBYaZu" /> <span>{{ email }}</span></li>
            <li><ResponsiveImage asset-id="75RbcrOfwy8PjWst9Hf5yc" /> <span>{{ phone }}</span></li>
          </ul>
        </div>
      </section>

      <section class="content contact-form">
        <div class="content-main">
          <form>
            <label>Name <input type="text"></label>
            <label>Email <input type="email"></label>
            <label>Phone <input type="tel"></label>
            <label>Your message <textarea /></label>

            <div class="button-container">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageContent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // Load content from CMS
  async asyncData ({ $config, $contentful }) {
    // Retrieve email address content
    const email = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_CONTACT_INFO,
      'fields.type[match]': 'Email'
    })

    // Retrieve phone number content
    const phone = await $contentful.getEntries({
      content_type: $config.CTF_CONTENT_TYPE_CONTACT_INFO,
      'fields.type[match]': 'Phone'
    })

    // Populate a data object for us to use in our template
    return {
      email: email.items[0].fields.contact,
      phone: phone.items[0].fields.contact
    }
  }
})
</script>

<style lang="scss">
.contact-options {
  ul {
    display: block;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    column-gap: 8em;

    li {
      display: block;

      img {
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
      }
    }
  }
}

.contact-form {
  label {
    display: block;
  }
}
</style>
