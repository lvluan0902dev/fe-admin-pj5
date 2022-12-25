import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { OrderItem } from 'src/app/main/models/order-item/order-item.model';
import { Order } from 'src/app/main/models/order/order.model';
import { OrderService } from 'src/app/main/services/order/order.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.component.html',
  styleUrls: ['./order-done.component.css']
})
export class OrderDoneComponent implements OnInit {
  public url = environment.url + '/';
  public datas: Order[] = [];
  public totalResult: number = 0;
  public total: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';
  private dataExportExcel: any[] = [];

  // Order details
  private orderId: number = 0;
  public orderDetailsDialog: boolean = false;
  public orderDetailsEvent: any;
  public orderDetailsLoading: boolean = false;
  public orderDetailsDatas: OrderItem[] = [];
  public orderDetailsTotalResult: number = 0;
  public orderDetailsTotal: number = 0;
  public totalPrice: number = 0;
  public order!: Order;

  constructor(
    private orderService: OrderService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this.title.setTitle('Danh sách Đơn hàng đã hoàn thành');
  }

  ngOnInit(): void {

  }

  public load(event: LazyLoadEvent) {
    this.setLoadingStatus(true);
    this.event = event;
    this.event.searchInput = this.search_input;
    setTimeout(() => {
      this.loadData();
    }, 1000);
  }

  public search(value: string) {
    this.setLoadingStatus(true);
    this.search_input = value;
    this.event.searchInput = this.search_input;
    this.loadData();
  }

  private loadData() {
    this.orderService.list(2, this.event).subscribe((response) => {
      this.datas = response.data;
      this.totalResult = response.total_result;
      this.total = response.total;
      this.setLoadingStatus(false);
      this.getDataForExportExcel();
    });
  }

  /**
   * 
   * @param id - order id
   * @param status - status
   */
  public changeOrderStatus(id: number, orderStatus: number) {
    let message = '';
    if (orderStatus == 1) {
      message = "Đổi đơn hàng sang trạng thái 'Đang vận chuyển'?"
    } else if (orderStatus == 2) {
      message = "Đổi đơn hàng sang trạng thái 'Đã hoàn thành'?"
    } else if (orderStatus == 3) {
      message = "Đổi đơn hàng sang trạng thái 'Đã huỷ'?"
    }

    this.confirmationService.confirm({
      message: message,
      header: 'Đổi trạng thái',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.orderService.changeOrderStatus(id, orderStatus).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.setLoadingStatus(true);
            this.loadData();
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      },
      reject: () => {

      },
      key: "topDialog"
    });
  }

  private setLoadingStatus(status: boolean) {
    this.loading = status;
  }

  // Order details
  public showOrderDetailsDialog(orderId: number) {
    this.orderId = orderId;
    this.orderDetailsDialog = true;
    this.getTotalPrice();
    this.getOrderDetails();
  }

  public orderDetailsLoad(event: LazyLoadEvent) {
    this.orderDetailsSetLoadingStatus(true);
    this.orderDetailsEvent = event;
    setTimeout(() => {
      this.orderDetailsLoadData();
    }, 1000);
  }

  private orderDetailsSetLoadingStatus(status: boolean) {
    this.orderDetailsLoading = status;
  }

  private orderDetailsLoadData() {
    this.orderService.orderDetailsList(this.orderDetailsEvent, this.orderId).subscribe((response) => {
      this.orderDetailsDatas = response.data;
      this.orderDetailsTotalResult = response.total_result;
      this.orderDetailsTotal = response.total;
      this.orderDetailsSetLoadingStatus(false);
    });
  }

  private getTotalPrice() {
    this.orderService.getOrderTotalPrice(this.orderId).subscribe((response) => {
      if (response.success == 1) {
        this.totalPrice = response.data;
      }
    })
  }

  private getOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe((response) => {
      if (response.success == 1) {
        this.order = response.data;
      }
    })
  }

  public exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataExportExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "don_hang");
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_da_hoan_thanh_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private getDataForExportExcel() {
    this.orderService.getDataForExportExcel(2).subscribe((response) => {
      if (response.success == 1) {
        this.dataExportExcel = response.data;
      }
    })
  }
}
