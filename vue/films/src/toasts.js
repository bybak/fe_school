import Vue from 'vue';
let dangerToast = (text) => {
    (new Vue()).$bvToast.toast(text, {
        title: 'Error',
        autoHideDelay: 5000,
        appendToast: true,
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
        solid: false
    });
}

export default dangerToast;