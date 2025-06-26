import type {Block, Mode} from '../types';
//TODO: объединить импорты в один
import { DraggableBlock } from './DraggableComponents';
import {DisplayBlock} from "./calculatorBlocks/DisplayBlock.tsx";
import {KeyboardBlock} from "./calculatorBlocks/KeyboardBlock.tsx";
import {OperationsBlock} from "./calculatorBlocks/OperationsBlock.tsx";
import {EqualsBlock} from "./calculatorBlocks/EqualsBlock.tsx";


export const BlockPalette = ({ blocks, mode }: { blocks: Block[]; mode: Mode }) => {
	const availableBlocks = blocks.filter(b => !b.isInCalculator);

	if (mode === 'runtime') {
		return null;
	}

	if (availableBlocks.length === 0) {
		return (
			<section className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
				<div className="text-center text-gray-400">
					<div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-2xl">✅</div>
					<p className="text-lg font-medium">Все блоки использованы</p>
					<p className="text-sm mt-2">Двойной клик по блоку в калькуляторе<br/>вернет его обратно</p>
				</div>
			</section>
		);
	}

	return (
		<section className="space-y-4">
			{availableBlocks.map(block => (
				<DraggableBlock key={block.id} block={block} mode={mode}>
					<div>
						{block.type === 'display' && <DisplayBlock value="0" isInCalculator={false} />}
						{block.type === 'keyboard' && <KeyboardBlock onNumberClick={() => {}} disabled={true} isInCalculator={false} />}
						{block.type === 'operations' && block.id === 'operations' && (
							<OperationsBlock onOperation={() => {}} onClear={() => {}} disabled={true} isInCalculator={false} />
						)}
						{block.type === 'operations' && block.id === 'equals' && (
							<EqualsBlock onEquals={() => {}} disabled={true} isInCalculator={false} />
						)}
					</div>
				</DraggableBlock>
			))}
		</section>
	);
};