<template>
  <div class="page">
    <CmsPage>
      <section>
        <div class="contact">
          <ul class="contact__list">
            <li class="contact__item">
              <CmsImage asset-id="62rXvksqqpbAiheFLBYaZu" class-name="contact__image" />
              <span class="contact__label">
                <a :href="'mailto:' + email">{{ email }}</a>
              </span>
            </li>
            <li class="contact__item">
              <CmsImage asset-id="75RbcrOfwy8PjWst9Hf5yc" class-name="contact__image" />
              <span class="contact__label">
                {{ phone }}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="form">
          <form accept-charset="UTF-8" enctype="multipart/form-data" method="post" action="https://submit.jotformeu.com/submit/220134543182042/">
            <label class="form__label">
              Name
              <input type="text" name="q4_typeA" class="form__input" required>
            </label>
            <label class="form__label">
              Email
              <input type="email" name="q5_email" class="form__input" required>
            </label>
            <label class="form__label">
              Phone
              <input type="tel" name="q8_typeA8" class="form__input" required>
            </label>
            <label class="form__label">
              Your message
              <textarea name="q7_typeA7" rows="6" class="form__input" required />
            </label>

            <input type="hidden" name="formID" value="220134543182042">

            <div class="button-container">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </CmsPage>
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

<style lang="scss" scoped>
.contact {
  padding: 4em 1em;
}

.contact__list {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 8em;
  list-style: none;
}

.contact__item {
  display: block;
}

.contact__image {
  border: 0;
  vertical-align: middle;
}

.contact__label {
  vertical-align: middle;
}

.form {
  margin: auto;
  padding: 1em 0;
  max-width: $max-width;

  form {
    width: 100%;
  }
}

.form__label {
  display: block;
  margin: 1em 0;
}

.form__input {
  display: block;
  padding: .2em;
  width: 100%;
}

@include medium-screens {
  .form {
    padding: 1em;
  }
}

@include small-screens {
  .contact__list {
    flex-wrap: wrap;
    row-gap: 2em;
  }
}
</style>
