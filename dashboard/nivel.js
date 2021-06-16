$(document).ready(function(){
    tablaNivel = $("#tablaNivel").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditarNivel'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"  
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
    
$("#btnNuevoNivel").click(function(){
    $("#formNivel").trigger("reset");
    $(".modal-header").css("background-color", "#1cc88a");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Persona");            
    $("#modalNivel").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditarNivel", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    descripcion = fila.find('td:eq(1)').text();
    dias = fila.find('td:eq(2)').text();
    
    $("#descripcion").val(descripcion);
    $("#dias").val(dias);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#4e73df");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Persona");            
    $("#modalNivel").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "bd/md_nivel.php",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, id:id},
            success: function(){
                tablaNivel.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formNivel").submit(function(e){
    e.preventDefault();    
    descripcion = $.trim($("#descripcion").val());
    dias = $.trim($("#dias").val());
    $.ajax({
        url: "bd/md_nivel.php",
        type: "POST",
        dataType: "json",
        data: {descripcion:descripcion, dias:dias, id:id, opcion:opcion},
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            descripcion = data[0].descripcion;
            dias = data[0].dias;
            
            if(opcion == 1){tablaNivel.row.add([id,descripcion,dias]).draw();}
            else{tablaNivel.row(fila).data([id,descripcion,dias]).draw();}            
        }        
    });
    $("#modalNivel").modal("hide");    
    
});    
    
});