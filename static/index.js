(function() {
  const endButton = document.getElementById('end')
  const weidth = document.getElementById('weidth_id')
  const rep = document.getElementById('rep_id')
  const inp = document.getElementById('inp')
  const listApproach = document.getElementById('list_approach')
  const sel = document.querySelector('select')
  const selectLabel = document.getElementById('select_label')
  const container = document.querySelector('.container')

  const head = document.querySelector('h2')

  let exe;

  sel.selectedIndex = -1

  let count = 1
  
  let ajax_get = function(url, callback) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log('responseText:' + xmlhttp.responseText);
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch(err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };
    
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

  function createNewElement (el) {
    return document.createElement(el)
  }



  document.getElementById('add').addEventListener('click', function () {
    let tableRow = createNewElement('tr')
    let tableData = createNewElement('td')

    let url = '/add?exe='+ exe +'&weidth=' + weidth.value + '&rep=' + rep.value
    ajax_get(url, function (data){
      tableRow.appendChild(tableData) 
      tableData.innerHTML = data['weidth']+ ' кг на ' + data['rep'] + ' повторений'
      listApproach.lastChild.appendChild(tableRow)
    })
    
    weidth.value = ''
    rep.value = ''
    end.className = 'appear'
  })

  document.getElementById('remove').addEventListener('click', function () {
    inp.className = 'none'
    selectLabel.className = 'appear'
    sel.selectedIndex = -1
    count ++
  })

  endButton.addEventListener('click', function() {
    listApproach.innerHTML = '<h3>Список подходов<h3>'
    inp.className = 'none'
    endButton.className = 'none'
    listApproach.className = 'none'
    selectLabel.className = 'appear'
    sel.selectedIndex = -1
  })

  sel.addEventListener('change', function (e) {
    exe = e.target.options[e.target.selectedIndex].text
    let table = createNewElement('table')
    let tableRow = createNewElement('tr')

    table.appendChild(tableRow)
    table.setAttribute('width', 400)
    tableRow.appendChild(createNewElement('th')).innerHTML = exe 
    tableRow.appendChild(createNewElement('th')).innerHTML = 'Упражнение ' + count

    inp.className = 'appear'
    selectLabel.className = 'none'

    listApproach.className = 'appear'
    listApproach.appendChild(table)

    head.innerHTML = exe
    inp.insertBefore(head, inp.firstChild)
  })

})()