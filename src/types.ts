export type BlockType = 'display' | 'keyboard' | 'operations';
export type Mode = 'runtime' | 'constructor';

export interface Block {
	id: string;
	type: BlockType;
	title: string;
	isInCalculator: boolean;
}

export interface CalculatorState {
	currentValue: string;
	previousValue: string;
	operation: 'add' | 'subtract' | null;
	shouldResetDisplay: boolean;
	displayExpression: string;
}