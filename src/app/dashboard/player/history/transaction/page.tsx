import HeaderMenu from "../../booking/_components/HeaderMenu";
import TableTransaction from "./_components/TableTransaction";

export default function HistoryTransactionPage() {
  return (
    <>
      <HeaderMenu menuName='Riwayat Transaksi' />
      <div className='pt-18 md:pt-20 p-2 md:p-4'>
        <TableTransaction />
      </div>
    </>
  );
}
