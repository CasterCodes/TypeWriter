const TypeWriter = function(txtElement, words, wait=3000){
   this.txtElement = txtElement;
   this.words = words;
   this.txt = '';
   this.wordIndex = 0;
   this.wait = +wait;
   this.type();
   this.isDeleting = false;

}


// type method
TypeWriter.prototype.type = function() {
     //current index of word
    const current = this.wordIndex %  this.words.length;
    //get the current full word
    const fullWord = this.words[current];
    // check if isDeleting
    if(this.isDeleting) {
       // remove a character
       this.txt = fullWord.substring(0, this.txt.length - 1);
    }else{
      // add a character
      this.txt = fullWord.substring(0, this.txt.length + 1);
    }
    // insert txt into the element
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

    // Intial type speed
    let typeSpeed = 300;
    if(this.isDeleting){
          typeSpeed /= 2;
    }
    // if word is complete
    if(!this.isDeleting && this.txt === fullWord) {
        //make a pause at the end
        typeSpeed = this.wait;
        // set delete to true
        this.isDeleting = true;
    }else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          //move to the next word
          this.wordIndex++;
          // pause before start typing 
          typeSpeed = 500;
          setTimeout(() => this.type(), typeSpeed);
    }
    setTimeout(() => this.type(), 500);
}
//Init on Dom load
document.addEventListener('DOMContentLoaded', init);


//init App
function init( ) {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWriter(txtElement, words,wait)
}