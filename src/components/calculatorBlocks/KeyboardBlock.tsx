export const KeyboardBlock = ({ onNumberClick, disabled, isInCalculator }: {
	onNumberClick: (num: string) => void;
	disabled: boolean;
	isInCalculator: boolean;
}) => {
	const handleClick = (num: string) => () => {
		if (!disabled) {
			onNumberClick(num);
		}
	};

	return (
		<section className={`${isInCalculator ? '' : 'bg-white'} rounded-lg p-4 ${isInCalculator ? '' : 'shadow-sm border border-gray-200'}`}>
			<div className="grid grid-cols-3 gap-2">
				{[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
					<button
						key={num}
						onClick={handleClick(num.toString())}
						className={`h-12 rounded border text-lg font-medium transition-colors ${isInCalculator ? '' : 'hover:cursor-grab'} ${
							disabled
								? 'bg-gray-100 opacity-50'
								: ' hover:bg-gray-100 hover:cursor-pointer'
						}`}
					>
						{num}
					</button>
				))}
				<button
					onClick={handleClick('0')}
					className={`col-span-3 h-12 rounded border text-lg font-medium transition-colors ${isInCalculator ? '' : 'hover:cursor-grab'} ${
						disabled
							? 'bg-gray-100 opacity-50'
							: 'hover:bg-gray-100 hover:cursor-pointer'
					}`}
				>
					0
				</button>
			</div>
		</section>
	);
};