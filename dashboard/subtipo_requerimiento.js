$(document).ready(function(){
    tablasubtipo = $("#tablasubtipo").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnSubTipoEditar'>Editar</button><button class='btn btn-danger btnBorrarSubTipo'>Borrar</button></div></div>"  
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
    
$("#btnNuevaSubTipo").click(function(){
    $("#formSubTipo").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Tipo de Requerimiento");            
    $("#modalSubTipo").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnSubTipoEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    descripcion = fila.find('td:eq(1)').text();
    tipo = fila.find('td:eq(2)').text();
    // console.log(area); 

    
    $("#descripcion").val(descripcion);
    $("#id_tipo option:contains("+tipo+")").attr('selected', true);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar subtipo");            
    $("#modalSubTipo").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrarSubTipo", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/md_subtipo_requerimiento.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablasubtipo.row(fila.parents('tr')).remove().draw();
            }
        });
        location.reload();
    }   
});
    
$("#formSubTipo").submit(function(e){
    e.preventDefault();    
    descripcion = $.trim($("#descripcion").val());
    id_tipo = $("#id_tipo").val();
       
    $.ajax({
        url: "bd/md_subtipo_requerimiento.php",
        type: "POST",
        dataType: "json",
        data: {descripcion:descripcion,id_tipo:id_tipo, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            descripcion = data[0].descripcion;
            tipo = data[0].tipo;
            
            if(opcion == 1){tablasubtipo.row.add([id,descripcion,tipo]).draw();}
            else{tablasubtipo.row(fila).data([id,descripcion,tipo]).draw();}            
        }        
    });
    $("#modalSubTipo").modal("hide");    
    
});    
    
});