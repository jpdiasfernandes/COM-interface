function link() {
    $("table").on("click", "tr", function(e) {
        if ($(e.target).is("a,input")) // anything else you don't want to trigger the click
            return;

        location.href = $(this).find("a").attr("href");
    });

}

function addField(type, name, element, label) {

    var rowLegend = document.createElement('div')
    rowLegend.setAttribute('class', 'w3-row legend-' + name)
    var legend = document.createElement('legend')
    var content = document.createTextNode(label)
    legend.appendChild(content)
    rowLegend.appendChild(legend)

    var newInput = document.createElement('input')
    newInput.setAttribute('type', type)
    newInput.setAttribute('name', name)
    newInput.setAttribute('class', "w3-input w3-round")
    var fieldset = document.getElementById(element)

    var row = document.createElement('div')
    row.setAttribute('class', "w3-row row-" + name)

    var col1 = document.createElement('div')
    col1.setAttribute('class', "w3-col w3-half")
    col1.appendChild(newInput)

    var col2 = document.createElement('div')
    col2.setAttribute('class', "w3-col w3-half w3-container")

    var button = document.createElement('a')
    button.setAttribute('onclick', "removeField('"+element+"', '"+name+"')")
    button.setAttribute('class', "w3-btn w3-red ")
    var buttonContent = document.createTextNode("X")
    button.appendChild(buttonContent)
    col2.appendChild(button)

    row.appendChild(col1)
    row.appendChild(col2)
    fieldset.appendChild(rowLegend)
    fieldset.appendChild(row)
}

function removeField(element, className) {
    var fieldset = document.getElementById(element)
    var rows = fieldset.getElementsByClassName("row-"+className)
    var legends = fieldset.getElementsByClassName("legend-"+className)
    fieldset.removeChild(legends[legends.length-1])
    fieldset.removeChild(rows[rows.length-1])
}