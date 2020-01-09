 
 $(document).ready(function(){
   
   
    $.ajax({url: "/file/directoryList", success: function(result){

         
       $('#tree').treeview({
        data: parcourir(result.tree),
        color:'#428bca',
        levels:1,
        collapseIcon:'far fa-folder-open',
        expandIcon:'far fa-folder'/* ,
         onNodeSelected:function(event , data) {
   console.log(event )
   console.log(data )
 
 }  */
        });
   }});  
   
   function parcourir(data)
   {
    for (var i in data) {
        if(data[i].type==='file'){
            
            data[i].icon= getIcon(data[i].text.substr( (data[i].name.lastIndexOf('.') +1) ));
            data[i].text=data[i].name+'<span class="indent"></span><i class="fas fa-download treeDownload" data-lien="'+data[i].path+'"></i> ';
        } 
        if(data[i].type==='folder') parcourir(data[i].nodes)
    }
    return data;
   }


   function getIcon(extension) {

    switch (extension.toLowerCase()) {
        case 'jpg': {
            return 'glyphicon glyphicon-picture';
            break;
        }
        case 'png': {
            return 'glyphicon glyphicon-picture';
            break;
        }
        case 'zip': {
            return 'far fa-file-archive';
            break;
        }
        case 'rar': {
            return 'far fa-file-archive';
            break;
        }
        case 'pdf': {
            return 'far fa-file-pdf';
            break;
        }
        case 'txt': {
            return 'far fa-file-alt';
            break;
        }
        case 'doc': {
            return 'far fa-file-alt';
            break;
        }
        case 'docx': {
            return 'far fa-file-alt';
            break;
        }

        default: {
            return 'glyphicon glyphicon-file';
        }
    }



}
      
   $("#tree").on('mousedown','.treeDownload',   (e) =>{
      let url=  $(e.target.attributes['data-lien']).val() ;
 
   window.location.replace("/file/download?url="+url);
 
 })
   
   $("#down").click(function(e) {
     /* e.preventDefault();   
     $("#content").load(this.href); */
     //$.ajax({url: "/file/download", success: function(result){ }});
     window.location.replace("/file/download");
 
 });
 
  
 
     
 });
      