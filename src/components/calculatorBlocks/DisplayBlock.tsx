export const DisplayBlock = ({ value, isInCalculator }: { value: string; isInCalculator: boolean }) => (
	<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 min-h-[80px] flex items-center justify-end">
    <span className="text-2xl font-mono text-gray-800">
      {isInCalculator ? value : '0'}
    </span>
	</div>
);