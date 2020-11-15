// Service là nơi chứa các phương thức tương tác với backend
var QuanLySinhVienService = function () {
    this.layThongTinSinhVien = function () {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
            method: 'GET'
        });

        return promise;
    }

    this.xoaSinhVien = function (maSinhVien){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
            method: 'DELETE'
        });
        return promise;
    }

    this.themSinhVien = function (sv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', // Đường dẫn backend cung cấp
        method: 'POST', // Phương thức backend cung cấp
        data: sv // dữ liệu backend yêu cầu (Lưu ý: Phải đúng định dạng backend cần có thể là object hoặc array => phải viết đúng tên thuộc tính phân biệt cả hoa thường)
        });
        return promise;
    }

    this.chinhSuaSinhVien = function (maSinhVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
            method: 'GET'
        });
        return promise;
    }

    this.capNhatThongTinSinhVien = function (sv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + svUpdate.maSinhVien,
            method: 'PUT',
            data: svUpdate
        });
        return promise;
    }
}