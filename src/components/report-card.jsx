import ReportCardImage from '../../public/images/9_Pragmatica_3D_Metal_Calendar.png';

function ReportCard() {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-5 h-64 flex flex-col">
      <div className="mb-2">
        <h2 className="text-[#5321CA] text-xl font-semibold">Report</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div>
          <img src={ReportCardImage} alt="Report Calendar" className="w-24 h-24" />
        </div>
        <p className="text-lg mt-2 font-bold text-[#23005B]">12th Aug, 2022</p>
      </div>
      <button className="bg-[#696CEE] w-full cursor-pointer text-white rounded-xl py-3 text-sm font-medium hover:bg-[#696CEE]/90 transition-colors">
        Download report
      </button>
    </div>
  );
}

export default ReportCard;