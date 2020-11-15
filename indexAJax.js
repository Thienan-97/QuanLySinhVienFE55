//------------------ GET: Lấy dữ liệu từ server backend cung cấp--------------
var svSerVice = new QuanLySinhVienService();

// var loadDuLieuSinhVien = function () {

//     var objectAjax = {
//         url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn đến backend lấy dữ liệu (backend quy định)
//         method: 'GET' //Phương thức do backend quy định
//     }

//     //Dùng thư viện axios gọi về backend cung cấp thông tin cho backend
//     var promise = axios(objectAjax);

var promise = svSerVice.layThongTinSinhVien();

// Trường hợp request thành công
promise.then(function (result) {
    // Function sẽ tự động thực thi ngay khi có dữ liệu (request thành công)
    console.log(result.data);
    // Sau khi lấy dữ liệu từ backend => Tạo table in ra giao diện
    renderTableSinhVien(result.data)
})

// Trường hợp thất bại
promise.catch(function (err) {
    // Hàm này sẽ được kích hoạt khi request thất bại trả về lỗi
    console.log(err.response.data);
})


// Viết hàm renderTable để hiển thi dữ liệu ra giao diện
var renderTableSinhVien = function (arrSinhVien) {
    var noiDungTable = '';
    for (var i = 0; i < arrSinhVien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangSinhVien
        var sv = new SinhVien();
        sv.maSinhVien = arrSinhVien[i].maSinhVien;
        sv.tenSinhVien = arrSinhVien[i].tenSinhVien;
        sv.email = arrSinhVien[i].email;
        sv.soDienThoai = arrSinhVien[i].soDienThoai;
        sv.diemHoa = arrSinhVien[i].diemHoa;
        sv.diemLy = arrSinhVien[i].diemLy;
        sv.diemToan = arrSinhVien[i].diemToan;
        sv.diemRenLuyen = arrSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = arrSinhVien[i].loaiSinhVien;
        noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>      
                        <button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')"> chỉnh sửa </button>             
                    </td>
                </tr> 
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
    console.log(noiDungTable);
}
// Gọi hàm load ngay khi giao diện vừa load lên
loadDuLieuSinhVien();
//----------------- POST: THÊM MỚI DỮ LIỆU VÀO SERVER THÔNG QUA BACKEND ---------------------------
document.querySelector('#btnXacNhan').onclick = function () {
    // Lấy thông tin người dùng nhập từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

    console.log('Sinh viên: ', sv);
    // Bỏ qua bước kiểm tra dữ liệu đầu vào (validation)

    // Dùng thư viện axios đưa dữ liệu về server
    // var objectAjax = {
    //     url: '',
    //     method: ''
    // }
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // Đường dẫn backend cung cấp
        method: 'POST', // Phương thức backend cung cấp
        data: sv // dữ liệu backend yêu cầu (Lưu ý: Phải đúng định dạng backend cần có thể là object hoặc array => phải viết đúng tên thuộc tính phân biệt cả hoa thường)
    });

    // Xử lý khi request thành công
    promise.then(function (result) {
        console.log("Kết quả", result.data);
    })
    // Xử lý khi request thất bại
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

//------------------- DELETA: XÓA DỮ LIỆU SERVER DỰA VÀO API -----------------
// var xoaSinhVien = function () {
//     alert(maSinhVien);
//     // Gọi api request đến backend
//     var promise = axios({
//         url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
//         method: 'DELETE'
//     });
    var promise = svSerVice.xoaSinhVien(maSinhVien);

    // Xử lý khi xóa thông tin thành công
    promise.then(function (result) {
        console.log(result.data);
        // Gọi hàm api lấy thông tin sinh viên 1 lần nữa từ server sau khi xóa
        loadDuLieuSinhVien();
    })

    // Xử lý khi xóa thông tin thất bại
    promise.catch(function (error) {
        console.log(error);
    })
}

//-----------------------GET: LẤY THÔNG TIN CÓ THAM SỐ THÔNG QUA BACKEND --------------
var promise = svSerVice.layThongTinSinhVien();
    // Xử lý thành công thì gán dữ liệu từ server lên các thẻ input phía trên
    promise.then(function (result) {
        console.log(result.data);
        var sv = result.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
    })
    // Xử lý thất bại thì log ra lỗi
    promise.catch(function (error) {
        console.log(error.data);
    })
}

//---------------------- PUT: CẬP NHẬT THÔNG TIN SERVER THÔNG QUA API ---------------------
document.querySelector('#btnLuuThongTin').onclick = function () {
    // Lấy thông tin người dùng nhập từ giao diện
    var svUpdate = new SinhVien();
    svUpdate.maSinhVien = document.querySelector('#maSinhVien').value;
    svUpdate.tenSinhVien = document.querySelector('#tenSinhVien').value;
    svUpdate.email = document.querySelector('#email').value;
    svUpdate.soDienThoai = document.querySelector('#soDienThoai').value;
    svUpdate.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    svUpdate.diemToan = document.querySelector('#diemToan').value;
    svUpdate.diemLy = document.querySelector('#diemLy').value;
    svUpdate.diemHoa = document.querySelector('#diemHoa').value;
    svUpdate.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

    console.log('Sinh viên: ', svUpdate);
    // Gọi api gửi đúng đường dẫn, phương thức và định dạng object
    var promise = svSerVice.capNhatThongTinSinhVien(sv);
    // Xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        // Thành công load lại table
        loadDuLieuSinhVien();
    })
    // Xử lý thất bại
    promise.catch(function (error) {
        console.log(error.data);
    })
}