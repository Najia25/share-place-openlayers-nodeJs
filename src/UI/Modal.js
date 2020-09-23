export class Modal {
  constructor( contentId ) {
    this.modalContentTemEl = document.getElementById(contentId);
    this.modalContainerTemEl = document.getElementById('modal-template');
  }
  show () {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(this.modalContainerTemEl.content, true);

      // properties of the object can be set from methods other than just the constructor.
      this.modal = modalElements.querySelector('.modal');
      this.backdrop = modalElements.querySelector('.backdrop');

      const modalContentElements = document.importNode(this.modalContentTemEl.content, true);
      this.modal.appendChild(modalContentElements);
      document.body.insertAdjacentElement('afterbegin', this.modal);
      document.body.insertAdjacentElement('afterbegin', this.backdrop);
    } else {
      alert('Browser doesnt support template')
    }
  }

  hide () {
    document.body.removeChild(this.modal);
    document.body.removeChild(this.backdrop);
    this.modal = null;
    this.backdrop = null;
  }
}