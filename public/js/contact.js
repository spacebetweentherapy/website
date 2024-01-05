/**
 * Handles form submissions for Google recaptcha v3.
 * Allows for HTML5 form validation to complete before processing.
 */
 function formSubmitBtn($event) {
    /**
     * Checks the validity of the form.
     * Return if invalid; HTML5 validation errors should display.
     */
    if (!$event.target.form.checkValidity()) {
        return;
    }
    /**
     * Form is client-side valid; taking over the remainder of processing.
     */
    $event.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute("6LcWIZ8eAAAAAKU4FyIdJiV6CrM_Y0255GyNKvGn", { action: 'submit' }).then(function(token) {
            /**
             * Adds the token g-recaptcha-response token to our hidden form element.
             * ** Notice ** we our referencing the specific form's input element by name here (do not use IDs).
             */
            $event.target.form.elements['g-recaptcha-response'].value = token;
            /**
             * Use the form API directly to submit the form.
             */
            $event.target.form.submit();
        });
    });
}