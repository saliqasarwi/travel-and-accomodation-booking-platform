import i18n from "@shared/i18n/i18n";
import type { BookingApiResponse } from "../types/confirmation.types";
import { calculateBookingTotals, nightsBetween } from "@shared/utils/booking";
import { money, formatDate } from "@shared/utils/formatters";

export function printBookingDocument(booking: BookingApiResponse) {
  const t = i18n.t.bind(i18n);

  const {
    subtotal: sub,
    discounts: disc,
    total: tot,
  } = calculateBookingTotals(booking.request.items);

  const guest = booking.request.guestInfo;
  const notes = booking.request.specialRequests?.notes;

  const roomRows = booking.request.items
    .map((item) => {
      const nights = nightsBetween(item.checkInDate, item.checkOutDate);
      const lineTotal = item.pricePerNight * (item.numberOfRooms || 1) * nights;

      return `
        <tr>
          <td>${item.hotelName}<br><small style="color:#666">${item.cityName}</small></td>
          <td>${item.roomType}</td>
          <td style="text-align:center">${item.checkInDate}</td>
          <td style="text-align:center">${item.checkOutDate}</td>
          <td style="text-align:center">${nights}</td>
          <td style="text-align:center">${item.numberOfRooms}</td>
          <td style="text-align:center">${item.adults} / ${item.children}</td>
          <td style="text-align:right">${money(item.pricePerNight)}</td>
          <td style="text-align:right">${money(lineTotal)}</td>
        </tr>`;
    })
    .join("");

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${t("confirmation.title")} ${booking.confirmationNumber}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Arial, Helvetica, sans-serif;
      color: #1a1a1a;
      padding: 40px 48px;
      background: #fff;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #1a1a1a;
      padding-bottom: 16px;
      margin-bottom: 28px;
    }
    .header h1 { font-size: 22px; font-weight: 800; }
    .header .meta { text-align: right; font-size: 13px; color: #555; }
    .header .meta .conf {
      font-size: 16px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 2px;
    }
    .badge {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .section { margin-bottom: 24px; }
    .section-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      margin-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 4px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 32px;
      font-size: 14px;
    }
    .info-grid .label { color: #888; }
    .info-grid .value { font-weight: 600; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      margin-top: 4px;
    }
    th {
      background: #f5f5f5;
      font-weight: 700;
      padding: 8px 10px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #555;
      border-bottom: 2px solid #ddd;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }
    td small { font-size: 11px; }
    .totals-table {
      width: 280px;
      margin-left: auto;
      font-size: 14px;
    }
    .totals-table td { padding: 4px 0; border: none; }
    .totals-table .label { color: #888; }
    .totals-table .value { text-align: right; font-weight: 600; }
    .totals-table .total-row td {
      border-top: 2px solid #1a1a1a;
      padding-top: 8px;
      font-size: 16px;
      font-weight: 800;
    }
    .footer {
      margin-top: 40px;
      padding-top: 12px;
      border-top: 1px solid #e0e0e0;
      font-size: 11px;
      color: #aaa;
      text-align: center;
    }
    @media print {
      body { padding: 24px 32px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>${t("confirmation.bookingConfirmed")}</h1>
      <span class="badge">${booking.bookingStatus}</span>
    </div>
    <div class="meta">
      <div class="conf">${booking.confirmationNumber}</div>
      <div>${formatDate(booking.createdAt)}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">${t("confirmation.guestInformation")}</div>
    <div class="info-grid">
      <span class="label">${t("confirmation.name")}</span>
      <span class="value">${guest.firstName} ${guest.lastName}</span>
      <span class="label">${t("confirmation.email")}</span>
      <span class="value">${guest.email}</span>
      <span class="label">${t("confirmation.phone")}</span>
      <span class="value">${guest.phone}</span>
    </div>
  </div>

  ${
    notes
      ? `
  <div class="section">
    <div class="section-title">${t("confirmation.specialRequests")}</div>
    <p style="font-size:14px">${notes}</p>
  </div>`
      : ""
  }

  <div class="section">
    <div class="section-title">${t("confirmation.hotelAndRooms")}</div>
    <table>
      <thead>
        <tr>
          <th>${t("confirmation.hotelLabel")}</th>
          <th>${t("confirmation.roomLabel")}</th>
          <th style="text-align:center">${t("confirmation.checkInLabel")}</th>
          <th style="text-align:center">${t("confirmation.checkOutLabel")}</th>
          <th style="text-align:center">${t("confirmation.nightsLabel")}</th>
          <th style="text-align:center">${t("confirmation.roomsLabel")}</th>
          <th style="text-align:center">${t("confirmation.guestsLabel")}</th>
          <th style="text-align:right">${t("confirmation.rateLabel")}</th>
          <th style="text-align:right">${t("confirmation.total")}</th>
        </tr>
      </thead>
      <tbody>${roomRows}</tbody>
    </table>
  </div>

  <div class="section">
    <table class="totals-table">
      <tr>
        <td class="label">${t("confirmation.subtotal")}</td>
        <td class="value">${money(sub)}</td>
      </tr>
      <tr>
        <td class="label">${t("confirmation.discounts")}</td>
        <td class="value">-${money(disc)}</td>
      </tr>
      <tr class="total-row">
        <td>${t("confirmation.total")}</td>
        <td class="value">${money(tot)}</td>
      </tr>
    </table>
  </div>

  <div class="footer">
    ${t("confirmation.thankYou")} • ${booking.confirmationNumber}
  </div>
</body>
</html>`);

  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
}
