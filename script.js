    const elements = document.querySelectorAll('.element');
    const dropZone = document.getElementById('dropZone');

    elements.forEach(el => {
      el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-type'));
      });
    });

    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.style.background = '#e9ecef';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.background = 'transparent';
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.style.background = 'transparent';
      const type = e.dataTransfer.getData('text/plain');
      const element = createElement(type);
      if (element) dropZone.appendChild(element);
    });

    function createElement(type) {
      let el;
      switch(type) {
        case 'text':
          el = document.createElement('div');
          el.className = 'text';
          el.innerHTML = '<div contenteditable="true">Editable text block</div>' + editButton();
          break;
        case 'image':
          el = document.createElement('div');
          el.className = 'image';
          el.innerHTML = '<input type="text" placeholder="Enter image URL" onblur="handleImageInsert(this)">' + editButton();
          break;
        case 'button':
          el = document.createElement('div');
          el.className = 'button';
          el.innerHTML = '<button contenteditable="true">Click Me</button>' + editButton();
          break;
        default:
          return null;
      }
      return el;
    }

    function editButton() {
      return '<div class="edit-area" onclick="removeElement(this)">❌ Remove</div>';
    }

    function handleImageInsert(input) {
      const url = input.value;
      if (url && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)) {
        input.parentNode.innerHTML = '<img src="' + url + '" alt="Image" style="max-width:100%;border-radius:8px;">' + editButton();
      } else {
        alert("Invalid image URL. Make sure it's a valid link ending in .jpg, .png, etc.");
      }
    }

    function removeElement(el) {
      const parent = el.parentNode;
      parent.remove();
    }
