    
function insertOptionNamSinh(){
  var namsinhOption = '<option value="0">Năm sinh</option>';
  for(var i = 1990; i <= 2022; i++){
    namsinhOption += '<option value="'+i+'">'+i+'</option>';
  }

  document.getElementById('namsinh').innerHTML = namsinhOption;
}
    

    //event
    document.getElementById("themdulieu").addEventListener("click", themDuLieu);

    function themDuLieu() {
      var item = {};
      item.id = new Date().getTime();
      item.hoten = document.getElementById("hoten").value;
      item.namsinh = document.getElementById("namsinh").value;
      item.gioitinh = document.querySelector('input[name="gioitinh"]:checked').value;
      var currentdate = new Date(); 
      var datetime = currentdate.getHours() + ":"  
                      + currentdate.getMinutes() + ":" 
                      + currentdate.getSeconds() + " - " + currentdate.getDate() + "/"
                      + (currentdate.getMonth()+1)  + "/" 
                      + currentdate.getFullYear();
      item.thoigiantao = datetime;
      addToList(item);

      location.reload();
    }

    function GioiTinh(gioitinh){
      if(gioitinh == "nam"){return "Nam";}
      else if(gioitinh == "nu"){return "Nữ";}
      else{return "Khác";}
    }

    function ConvertGioiTinhValue(gioitinh_label){
      if(gioitinh_label == "Nam"){return "nam";}
      else if(gioitinh_label == "Nữ"){return "nu";}
      else{return "khac";}
    }

    function addToList(item){
      var listArr = [];

      var list = localStorage.getItem('list');
      if(list == null){

        listArr = [];
        listArr.push(item);
      }else{
        listArr = JSON.parse(list);  
        listArr.push(item);
      }
      var newlist = JSON.stringify(listArr);
      localStorage.setItem('list', newlist);
      console.log(listArr);
    }

    function hienThiDanhSach(){
      var ds = localStorage.getItem('list');
      if(ds != null){
        var dsArr = JSON.parse(ds);
        console.log(dsArr);
        var tbodyHTML = '';

        for(var i = 0; i < dsArr.length; i++){
          var dsRow = '';
          dsRow += '<tr>';
          dsRow += '<th scope="row">'+(i + 1)+'<input type="hidden" class="id" value="'+dsArr[i].id+'"/></th>';
          dsRow += '<td>'+dsArr[i].hoten+'</td>';
          dsRow += '<td>'+dsArr[i].namsinh+'</td>';
          dsRow += '<td>'+GioiTinh(dsArr[i].gioitinh)+'</td>';
          dsRow += '<td>'+dsArr[i].thoigiantao+'</td>';
          dsRow += '<td><a href="#" class="btn btn-danger btn-sm btn-xoa">X</a></td>';
          dsRow += '</tr>';

          tbodyHTML += dsRow;
        }

        document.getElementsByTagName('tbody')[0].innerHTML = tbodyHTML;
      }
      
    }//end hienThiDanhSach

    function hienThiLaiDanhSach(dsArr){
      if(dsArr.length > 0){
        var tbodyHTML = '';

        for(var i = 0; i < dsArr.length; i++){
          var dsRow = '';
          dsRow += '<tr>';
          dsRow += '<th scope="row">'+(i + 1)+'</th>';
          dsRow += '<td>'+dsArr[i].hoten+'</td>';
          dsRow += '<td>'+dsArr[i].namsinh+'</td>';
          dsRow += '<td>'+GioiTinh(dsArr[i].gioitinh)+'</td>';
          dsRow += '<td>'+dsArr[i].thoigiantao+'</td>';
          dsRow += '<td><a href="#" class="btn btn-danger btn-sm btn-xoa">X</a></td>';
          dsRow += '</tr>';

          tbodyHTML += dsRow;
        }

        document.getElementsByTagName('tbody')[0].innerHTML = tbodyHTML;
      }
      
    }

    //filter namsinh
    document.getElementById("loc_namsinh").addEventListener("click", locNamSinh);

    function locNamSinh() {
      var namsinh = document.getElementById("loc_namsinh").value;
      if(namsinh != 0){
        var list = localStorage.getItem('list');
        var tableID = document.getElementById("danhsach");
        var tbody = tableID.getElementsByTagName('tbody')[0];
        var tr = tbody.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            var namsinhItem = tr[i].getElementsByTagName("td")[1].innerHTML;
            if(namsinhItem == namsinh){
              tr[i].style.display = "";
            }else{
              tr[i].style.display = "none";
            }
        }  
      }else{
        var tableID = document.getElementById("danhsach");
        var tbody = tableID.getElementsByTagName('tbody')[0];
        var tr = tbody.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
      }
      
    }

    //filter gioitinh
    document.getElementById("loc_gioitinh").addEventListener("click", locGioiTinh);

    function locGioiTinh() {
      var gioitinh = document.getElementById("loc_gioitinh").value;
      if(gioitinh != 0){
        var list = localStorage.getItem('list');
        var tableID = document.getElementById("danhsach");
        var tbody = tableID.getElementsByTagName('tbody')[0];
        var tr = tbody.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            var gioitinhItem = tr[i].getElementsByTagName("td")[2].innerHTML;
            var gioitinhValue = ConvertGioiTinhValue(gioitinhItem);

            if(gioitinhValue == gioitinh){
              tr[i].style.display = "";
            }else{
              tr[i].style.display = "none";
            }
        }  
      }else{
        var tableID = document.getElementById("danhsach");
        var tbody = tableID.getElementsByTagName('tbody')[0];
        var tr = tbody.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
      }
    }//end locGioiTinh

    //sort hoten
    document.getElementById("sapxep_truong").addEventListener("click", sapxepTruong);
    document.getElementById("sapxep_huong").addEventListener("click", sapxepTruong);

    function sapxepTruong(){
      var truong = document.getElementById("sapxep_truong").value;
      var huong = document.getElementById("sapxep_huong").value;
      var list = localStorage.getItem('list');
      var newSortList = [];
      if(list != null){
        var k = 0;
        var listArr = JSON.parse(list);  
        if(truong == "hoten"){
          for(var i = 0; i < listArr.length - 1; i++){
            for(var j = i+1; j < listArr.length; j++){
              if(huong == "tang"){
                if(listArr[i].hoten > listArr[j].hoten){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }
              }//end huong tang
              else{
                if(listArr[i].hoten < listArr[j].hoten){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }  
              }        
            }//end for
          }//end for
        }//end sort hoten

        else if(truong == "namsinh"){
          for(var i = 0; i < listArr.length - 1; i++){
            for(var j = i+1; j < listArr.length; j++){
              if(huong == "tang"){
                if(listArr[i].namsinh > listArr[j].namsinh){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }
              }//end huong tang
              else{
                if(listArr[i].namsinh < listArr[j].namsinh){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }  
              }        
            }//end for
          }//end for
        }//end sort namsinh  

        else if(truong == "gioitinh"){
          for(var i = 0; i < listArr.length - 1; i++){
            for(var j = i+1; j < listArr.length; j++){
              if(huong == "tang"){
                if(listArr[i].gioitinh > listArr[j].gioitinh){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }
              }//end huong tang
              else{
                if(listArr[i].gioitinh < listArr[j].gioitinh){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }  
              }        
            }//end for
          }//end for
        }//end sort namsinh 

        else if(truong == "thoigiantao"){
          for(var i = 0; i < listArr.length - 1; i++){
            for(var j = i+1; j < listArr.length; j++){
              if(huong == "tang"){
                if(listArr[i].thoigiantao > listArr[j].thoigiantao){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }
              }//end huong tang
              else{
                if(listArr[i].thoigiantao < listArr[j].thoigiantao){
                  var temp = listArr[i];
                  listArr[i] = listArr[j];
                  listArr[j] = temp;
                }  
              }        
            }//end for
          }//end for
        }//end sort namsinh  

      }//end list != null
      hienThiLaiDanhSach(listArr);  
    }//end sapxep 


    //xoa
    var ds = document.getElementById('danhsach');

    ds.addEventListener('click', function (event) {
      if (!event.target.classList.contains('btn-xoa')) {
        return;
      }

      var id = parseInt(event.target.parentNode.parentNode.getElementsByClassName('id')[0].value);
      XoaDong(id);

      event.target.parentNode.parentNode.remove();
      event.preventDefault();
    });

    function XoaDong(id){
      var list = localStorage.getItem('list');
      if(list != null){
        var listArr = JSON.parse(list);
        for(var i = 0; i < listArr.length; i++){
          if(listArr[i].id == id){
            listArr.splice(i, 1);
          }
        }
      }
      
      var newList = JSON.stringify(listArr);
      localStorage.setItem('list', newList);
    }

    //chi hien thi nam sinh da nhap trong o loc nam sinh
    function insertOptionLocNamSinh(){
      var loc_namsinhOptions = '<option value="0">Năm sinh</option>';
      var list = localStorage.getItem('list');
      if(list != null){
        var listArr = JSON.parse(list); 
        var namsinhDaNhap = [];
        for(var i = 0; i < listArr.length; i++){
          if(namsinhDaNhap.indexOf(i) == -1){
            namsinhDaNhap.push(listArr[i].namsinh);
          }
        }

        namsinhDaNhap.sort();
        for(var i = 0; i<namsinhDaNhap.length; i++){
          loc_namsinhOptions += '<option value="'+namsinhDaNhap[i]+'">'+namsinhDaNhap[i]+'</option>';
        }

        document.getElementById('loc_namsinh').innerHTML = loc_namsinhOptions;
      }  
    }
    
    insertOptionNamSinh();
    insertOptionLocNamSinh();

    //main
    hienThiDanhSach();
