<template>
  <div>
    <section>
      <div class="contact">
        <ul class="contact__list">
          <li class="contact__item">
            <img
              srcset="/images/icon-email-3x.png 3x, /images/icon-email-2x.png 2x, /images/icon-email.png 1x"
              src="/images/icon-email.png"
              width="30"
              height="30"
              alt="Email icon"
              class="contact__image"
            >
            <span class="contact__label">
              <a :href="'mailto:' + email">{{ email }}</a>
            </span>
          </li>
          <li class="contact__item">
            <img
              srcset="/images/icon-phone-3x.png 3x, /images/icon-phone-2x.png 2x, /images/icon-phone.png 1x"
              src="/images/icon-phone.png"
              width="30"
              height="30"
              alt="Telephone icon"
              class="contact__image"
            >
            <span class="contact__label">
              <a :href="'tel:' + phone">{{ phone }}</a>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'CmsPage',

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
  display: flex;
  align-items: center;
  column-gap: .5em;
}

.contact__image, .contact__image img {
  border: 0;
  width: 30px;
  height: 30px;
}

.contact__label {
  display: block;
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
