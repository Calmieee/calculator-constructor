export  const EqualsBlock = ({ onEquals, disabled, isInCalculator}: {
	onEquals: () => void;
	disabled: boolean;
	isInCalculator: boolean;
}) => {
	const handleClick = () => {
		if (!disabled) {
			onEquals();
		}
	};

	return (
		<section className={`${isInCalculator ? '' : 'bg-white'} rounded-lg ${isInCalculator ? '' : 'shadow-sm border border-gray-200'} overflow-hidden`}>
			<button
				onClick={handleClick}
				className={`w-full h-16 text-white text-xl font-medium transition-colors ${isInCalculator ? '' : 'hover:cursor-grab'} ${
					disabled
						? 'bg-violet-500'
						: 'bg-violet-600 hover:cursor-pointer'
				}`}
			>
				=
			</button>
		</section>
	);
};