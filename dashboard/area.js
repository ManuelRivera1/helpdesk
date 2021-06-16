$(document).ready(function(){
    tablaArea = $("#tablaArea").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnAreaEditar'>Editar</button><button class='btn btn-danger btnBorrarArea'>Borrar</button></div></div>"  
       }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnNuevaArea").click(function(){
    $("#formArea").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Area");            
    $("#modalArea").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnAreaEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    descripcion = fila.find('td:eq(1)').text();

    
    $("#descripcion").val(descripcion);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Area");            
    $("#modalArea").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrarArea", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/md_area.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaArea.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formArea").submit(function(e){
    e.preventDefault();    
    descripcion = $.trim($("#descripcion").val());
       
    $.ajax({
        url: "bd/md_area.php",
        type: "POST",
        dataType: "json",
        data: {descripcion:descripcion, id:id, opcion:opcion},
        success: function(data){  
            // console.log(data);
            id = data[0].id;            
            descripcion = data[0].descripcion;
            
            if(opcion == 1){tablaArea.row.add([id,descripcion]).draw();}
            else{tablaArea.row(fila).data([id,descripcion]).draw();}            
        }        
    });
    $("#modalArea").modal("hide");    
    
});    
    
});