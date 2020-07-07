class FormPopup extends Popup {
    constructor(popup, form, openButton, setSubmitButtonState, clearErrorMassege) {
        super(popup);
        this.form = form;
        this.openButton = openButton;


        this.setSubmitButtonState = setSubmitButtonState;
        this.clearErrorMassege = clearErrorMassege;

    }

    openForm() { };

    submitForm() {};

    
    close() {
        this.form.reset();
        super.close();
    }

    doOnOpenForm() {
        this.clearErrorMassege();
        this.setSubmitButtonState();
    }

    setListenersForm() {
        this.openButton.addEventListener("click", this.openForm);
        this.form.addEventListener("submit", this.submitForm);
    }
}
