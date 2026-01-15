document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);  // Tampilkan pesan sukses/error
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mengirim pesan.');
  });
});
