export const OperationsBlock = ({ onOperation, onClear, disabled, isInCalculator }: {
	onOperation: (op: 'add' | 'subtract') => void;
	onClear: () => void;
	disabled: boolean;
	isInCalculator: boolean;
}) => {
	const handleOperationClick = (op: 'add' | 'subtract') => () => {
		if (!disabled) {
			onOperation(op);
		}
	};

	const handleClearClick = () => {
		if (!disabled) {
			onClear();
		}
	};

	return (
		<section className={`${isInCalculator ? '' : 'bg-white'} rounded-lg p-4 ${isInCalculator ? '' : 'shadow-sm border border-gray-200'}`}>
			<div className="grid grid-cols-2 gap-2">
				<button
					onClick={handleOperationClick('subtract')}
					className={`h-12 rounded border text-lg font-medium transition-colors ${isInCalculator ? '' : 'bg-white hover:cursor-grab'} ${
						disabled
							? 'bg-gray-100 opacity-50'
							: ' hover:bg-gray-100 cursor-pointer'
					}`}
				>
					-
				</button>
				<button
					onClick={handleOperationClick('add')}
					className={`h-12 rounded border text-lg font-medium transition-colors ${isInCalculator ? '' : 'bg-white hover:cursor-grab'} ${
						disabled
							? 'bg-gray-100 opacity-50'
							: ' hover:bg-gray-100 hover: cursor-pointer'
					}`}
				>
					+
				</button>
				<button
					onClick={handleClearClick}
					className={`col-span-2 h-12 rounded border text-lg font-medium transition-colors text-red-600 ${isInCalculator ? '' : 'bg-white hover:cursor-grab'} ${
						disabled
							? 'bg-red-100 opacity-50'
							: 'bg-red-50 hover:bg-red-100 cursor-pointer'
					}`}
				>
					Сброс
				</button>
			</div>
		</section>
	);
};