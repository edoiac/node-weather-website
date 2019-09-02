console.log('js loaded!');
document.querySelector('.search').addEventListener('click', () => {
    document.querySelector('.wait').classList.remove('hidden');
    const inputValue = document.querySelector('input').value;
    fetch(`http://localhost:3000/weather?address=${inputValue}`).then((data) => {
      data.json().then((data) => {
          document.querySelector('.wait').classList.add('hidden');
          document.querySelector('.result').innerHTML = data.forecast;
      })
    })
});
