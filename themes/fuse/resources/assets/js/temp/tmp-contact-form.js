import * as basicLightbox from 'basiclightbox'

const instance = basicLightbox.create(`
    <div class="modal tmp-o-contact-modal">
        
    </div>
`,{

    beforeShow: (instance) => {},

});

const elem = instance.element().querySelector('.modal');

console.log(elem);

const lightboxTrigger = document.querySelector('.js-contact-lightbox');

lightboxTrigger.addEventListener('click', showlightbox);

function showlightbox(e){

    e.preventDefault();
    instance.show();
    hbspt.forms.create({
	    portalId: "4300762",
	    formId: "28308267-d642-4d5e-b388-6d29cc4ab2d5"
    });

}