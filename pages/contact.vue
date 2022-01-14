<template>
  <div class="page">
    <PageContent>
      <section class="content contact-details">
        <div class="content-main contact-options">
          <ul>
            <li><ResponsiveImage asset-id="62rXvksqqpbAiheFLBYaZu" /> <span><a :href="'mailto:' + email">{{ email }}</a></span></li>
            <li><ResponsiveImage asset-id="75RbcrOfwy8PjWst9Hf5yc" /> <span>{{ phone }}</span></li>
          </ul>
        </div>
      </section>

      <section class="content contact-form">
        <div class="content-main">
          <form accept-charset="UTF-8" enctype="multipart/form-data" method="post" action="https://submit.jotformeu.com/submit/220134543182042/">
            <label>Name <input type="text" name="q4_typeA" required></label>
            <label>Email <input type="email" name="q5_email" required></label>
            <label>Phone <input type="tel" name="q8_typeA8" required></label>
            <label>Your message <textarea name="q7_typeA7" rows="6" required /></label>

            <input type="hidden" name="formID" value="220134543182042" />

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
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 8em;
    list-style: none;

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

  img {
    border: 0;
  }
}

.contact-form {
  form {
    width: 100%;
  }

  label {
    display: block;
    margin: 1em 0;
  }

  input, textarea {
    display: block;
    padding: .2em;
    width: 100%;
  }
}

@include small-screens {
  .contact-options {
    ul {
      flex-wrap: wrap;
      row-gap: 2em;
    }
  }
}
</style>
