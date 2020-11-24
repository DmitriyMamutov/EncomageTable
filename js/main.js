$(document).ready(function(){
  
    fetch_data();
  
    function fetch_data()
    {
     var dataTable = $('#user_data').DataTable({
      "processing" : true,
      "serverSide" : true,
      "order" : [],
      "ajax" : {
       url:"fetch.php",
       type:"POST"
      }
     });
    }
    
    function update_data(id, column_name, value)
   
    {
     $.ajax({
      url:"update.php",
      method:"POST",
      data:{id:id, column_name:column_name, value:value},
      success:function(data)
      {
       $('#alert_message').html('<div class="alert alert-success">'+data+'</div>');
       $('#user_data').DataTable().destroy();
       fetch_data();
      }
     });
     setInterval(function(){
      $('#alert_message').html('');
     }, 5000);
    }
  
    $(document).on('blur', '.update', function(){
     var id = $(this).data("id");
     var column_name = $(this).data("column");
     var value = $(this).text();
     update_data(id, column_name, value);
    });
    
    $('#add').click(function(){
     var html = '<tr>';
     html += '<td contenteditable id="data1"></td>';
     html += '<td contenteditable id="data2"></td>';
     html += '<td contenteditable id="data3"></td>';
     html += '<td contenteditable id="data4"></td>';
     html += '<td contenteditable id="data5"></td>';
     html += '<td contenteditable id="data6"></td>';
     html += '<td><button type="button" name="insert" id="insert" class="btn btn-success btn-xs">Insert</button></td>';
     html += '</tr>';
     $('#user_data tbody').prepend(html);
    });
    
    $(document).on('click', '#insert', function(){
     var first_name = $('#data2').text();
     var last_name = $('#data3').text();
     var email = $('#data4').text();
     var dateCreated =$('#data5').text();
     var updateDate =$('#data6').text();
  
     
     if(first_name != '' && last_name != '')
     {
      $.ajax({
       url:"insert.php",
       method:"POST",
       data:{first_name:first_name, last_name:last_name, email:email, dateCreated:dateCreated},
       success:function(data)
       {
        $('#alert_message').html('<div class="alert alert-success">'+data+'</div>');
        $('#user_data').DataTable().destroy();
        fetch_data();
       }
      });
      setInterval(function(){
       $('#alert_message').html('');
      }, 10000);
     }
     else
     {
      alert("Fields are empty");
     }
    });
    
    $(document).on('click', '.delete', function(){
     var id = $(this).attr("id");
     if(confirm("Are you sure you want to remove this?"))
     {
      $.ajax({
       url:"delete.php",
       method:"POST",
       data:{id:id},
       success:function(data){
        $('#alert_message').html('<div class="alert alert-success">'+data+'</div>');
        $('#user_data').DataTable().destroy();
        fetch_data();
       }
      });
      setInterval(function(){
       $('#alert_message').html('');
      }, 10000);
     }
    });
   });