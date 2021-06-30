$(document).ready(function(){
    tablatipo = $("#tablatipo").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnTipoEditar'>Editar</button><button class='btn btn-danger btnBorrarTipo'>Borrar</button></div></div>"  
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
    
$("#btnNuevaTipo").click(function(){
    $("#formTipo").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Area");            
    $("#modalTipo").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnTipoEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    descripcion = fila.find('td:eq(1)').text();
    area = fila.find('td:eq(2)').text();
    // console.log(area); 

    
    $("#descripcion").val(descripcion);
    $("#id_area option:contains("+area+")").attr('selected', true);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Area");            
    $("#modalTipo").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrarTipo", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/md_tipo_requerimiento.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablatipo.row(fila.parents('tr')).remove().draw();
            }
        });
        location.reload();
    }   
});
    
$("#formTipo").submit(function(e){
    e.preventDefault();    
    descripcion = $.trim($("#descripcion").val());
    id_area = $("#id_area").val();
       
    $.ajax({
        url: "bd/md_tipo_requerimiento.php",
        type: "POST",
        dataType: "json",
        data: {descripcion:descripcion,id_area:id_area, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            descripcion = data[0].descripcion;
            area = data[0].area;
            
            if(opcion == 1){tablatipo.row.add([id,descripcion,area]).draw();}
            else{tablatipo.row(fila).data([id,descripcion,area]).draw();}            
        }        
    });
    $("#modalTipo").modal("hide");    
    
});    
    
});