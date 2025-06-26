import { useDroppable } from '@dnd-kit/core';
import type {Block, CalculatorState, Mode} from '../types';
import { SortableBlock, DropPlaceholder } from './DraggableComponents';
import { ImagePlus } from 'lucide-react';
//TODO: объединить импорты в один
import {DisplayBlock} from "./calculatorBlocks/DisplayBlock.tsx";
import {KeyboardBlock} from "./calculatorBlocks/KeyboardBlock.tsx";
import {OperationsBlock} from "./calculatorBlocks/OperationsBlock.tsx";
import {EqualsBlock} from "./calculatorBlocks/EqualsBlock.tsx";

export const CalculatorContainer = ({
	                                    blocks,
	                                    calculatorState,
	                                    onBlockDoubleClick,
	                                    onNumberClick,
	                                    onOperation,
	                                    onEquals,
	                                    onClear,
	                                    mode
                                    }: {
	blocks: Block[];
	calculatorState: CalculatorState;
	onBlockDoubleClick: (blockId: string) => void;
	onNumberClick: (num: string) => void;
	onOperation: (op: 'add' | 'subtract') => void;
	onEquals: () => void;
	onClear: () => void;
	mode: Mode;
}) => {
	const { setNodeRef, isOver } = useDroppable({ id: 'calculator-container' });
	const isRuntimeMode = mode === 'runtime';
	const showDashedBorder = mode === 'constructor' && blocks.length === 0;

	return (
		<section className='space-y-4'>
			<DropPlaceholder isOver={isOver}>
				<div
					ref={setNodeRef}
					className={`min-h-[400px] rounded-lg p-6 transition-colors duration-200 ${
						showDashedBorder
							? isOver
								? 'border-2 border-dashed border-violet-500 bg-blue-50'
								: 'border-2 border-dashed border-gray-300 bg-gray-50'
							: mode === 'runtime'
								? 'bg-white'
								: 'bg-gray-50'
					}`}
				>
					{blocks.length === 0 ? (
						<div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400">
							<div className="w-16 h-16 flex items-center justify-center text-3xl">
								{isOver ? '' : <ImagePlus className='stroke-black min-w-9 min-h-9'/>}
							</div>
							<p className="text-lg font-medium text-violet-500">
								{isOver ? 'Отпустите блок здесь' : 'Перетащите сюда'}
							</p>
							<p className="text-sm text-center">
								{isOver
									? 'Блок будет добавлен в калькулятор'
									: 'Любой элемент из боковой панели'
								}
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{blocks.map((block) => (
								<div
									key={block.id}
									className="sortable-block"
									data-block-id={block.id}
								>
									<SortableBlock
										block={block}
										mode={mode}
										onDoubleClick={() => onBlockDoubleClick(block.id)}
									>
										<div>
											{block.type === 'display' && (
												<DisplayBlock value={calculatorState.displayExpression} isInCalculator={true} />
											)}
											{block.type === 'keyboard' && (
												<KeyboardBlock onNumberClick={onNumberClick} disabled={!isRuntimeMode} isInCalculator={true}  />
											)}
											{block.type === 'operations' && block.id === 'operations' && (
												<OperationsBlock onOperation={onOperation} onClear={onClear} disabled={!isRuntimeMode} isInCalculator={true} />
											)}
											{block.type === 'operations' && block.id === 'equals' && (
												<EqualsBlock onEquals={onEquals} disabled={!isRuntimeMode} isInCalculator={true} />
											)}
										</div>
									</SortableBlock>
								</div>
							))}
						</div>
					)}
				</div>
			</DropPlaceholder>
		</section>
	);
};