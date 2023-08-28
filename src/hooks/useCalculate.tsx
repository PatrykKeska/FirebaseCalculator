import { useEffect, useState } from 'react';

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Operator = '+' | '-' | '×' | '÷' | '%';
export interface LogsInterface {
  firstParamether: number;
  operator: string;
  secondParamether: number;
  result: number;
}
export const useCalculate = () => {
  const [memory, setMemory] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
  const [pendingOperator, setPendingOperator] = useState<Operator>();
  const [display, setDisplay] = useState<string>('0');
  const [logs, setLogs] = useState<LogsInterface>({
    firstParamether: 0,
    operator: '',
    secondParamether: 0,
    result: 0,
  });

  const calculate = (
    rightOperand: number,
    pendingOperator: Operator
  ): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand;
        break;
      case '-':
        newResult -= rightOperand;
        break;
      case '×':
        newResult *= rightOperand;
        break;
      case '%':
        newResult /= 100;
        break;
      case '÷':
        if (rightOperand === 0) {
          return false;
        }

        newResult /= rightOperand;
    }

    setResult(newResult);
    setDisplay(newResult.toString().toString().slice(0, 12));

    setLogs({
      firstParamether: result,
      operator: pendingOperator,
      secondParamether: Number(display),
      result: newResult,
    });

    return true;
  };

  const handleKeyDown = ({ keyCode, shiftKey }: KeyboardEvent) => {
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      onDigitButtonClick((keyCode - 48) as Digit);
    } else if (keyCode >= 96 && keyCode <= 105) {
      onDigitButtonClick((keyCode - 96) as Digit);
    } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
      onOperatorButtonClick('+');
    } else if (keyCode === 109 || keyCode === 189) {
      onOperatorButtonClick('-');
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      onOperatorButtonClick('×');
    } else if (keyCode === 111 || keyCode === 191) {
      onOperatorButtonClick('÷');
    } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
      onEqualButtonClick();
    } else if (keyCode === 46) {
      onClearEntryButtonClick();
    } else if (keyCode === 27) {
      onAllClearButtonClick();
    } else if (keyCode === 78) {
      onChangeSignButtonClick();
    } else if (keyCode === 80) {
      onMemoryPlusButtonClick();
    } else if (keyCode === 81) {
      onMemoryMinusButtonClick();
    } else if (keyCode === 82) {
      onMemoryRecallButtonClick();
    } else if (keyCode === 77) {
      onMemoryClearButtonClick();
    } else if (keyCode === 190 || (keyCode === 110 && !shiftKey)) {
      onPointButtonClick();
    } else if (keyCode === 8) {
      if (display.length === 1) {
        setDisplay('0');
      } else {
        setDisplay(display.slice(0, -1));
      }
    } else if (keyCode === 67) {
      onAllClearButtonClick();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => document.body.removeEventListener('keydown', handleKeyDown);
  });

  // Pad buttons handlers
  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display;

    if ((display === '0' && digit === 0) || display.length > 12) {
      return;
    }

    if (waitingForOperand) {
      newDisplay = '';
      setWaitingForOperand(false);
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString();
    } else {
      newDisplay = digit.toString();
    }

    setDisplay(newDisplay);
  };

  const onPointButtonClick = () => {
    let newDisplay = display;

    if (waitingForOperand) {
      newDisplay = '0';
    }

    if (newDisplay.indexOf('.') === -1) {
      newDisplay = newDisplay + '.';
    }

    setDisplay(newDisplay);
    setWaitingForOperand(false);
  };

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }
    } else {
      setResult(operand);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  };

  const onChangeSignButtonClick = () => {
    const value = Number(display);

    if (value > 0) {
      setDisplay('-' + display);
    } else if (value < 0) {
      setDisplay(display.slice(1));
    }
  };

  const onEqualButtonClick = () => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }

      setPendingOperator(undefined);
    } else {
      setDisplay(operand.toString());
    }

    setResult(operand);
    setWaitingForOperand(true);
  };

  const onAllClearButtonClick = () => {
    setMemory(0);
    setResult(0);
    setPendingOperator(undefined);
    setDisplay('0');
    setWaitingForOperand(true);
  };

  const onClearEntryButtonClick = () => {
    setDisplay('0');
    setWaitingForOperand(true);
  };

  const onMemoryRecallButtonClick = () => {
    setDisplay(memory.toString());
    setWaitingForOperand(true);
  };

  const onMemoryClearButtonClick = () => {
    setMemory(0);
    setWaitingForOperand(true);
  };

  const onMemoryPlusButtonClick = () => {
    setMemory(memory + Number(display));
    setWaitingForOperand(true);
  };

  const onMemoryMinusButtonClick = () => {
    setMemory(memory - Number(display));
    setWaitingForOperand(true);
  };

  const buttonList = [
    { value: 'C', onClick: onAllClearButtonClick, type: 'string' },
    { value: '+-', onClick: onChangeSignButtonClick, type: 'string' },
    { value: '%', onClick: () => onOperatorButtonClick('%'), type: 'string' },
    { value: '÷', onClick: () => onOperatorButtonClick('÷'), type: 'string' },
    { value: '7', onClick: () => onDigitButtonClick(7), type: 'number' },
    { value: '8', onClick: () => onDigitButtonClick(8), type: 'number' },
    { value: '9', onClick: () => onDigitButtonClick(9), type: 'number' },
    { value: '×', onClick: () => onOperatorButtonClick('×'), type: 'string' },
    { value: '4', onClick: () => onDigitButtonClick(4), type: 'number' },
    { value: '5', onClick: () => onDigitButtonClick(5), type: 'number' },
    { value: '6', onClick: () => onDigitButtonClick(6), type: 'number' },
    { value: '-', onClick: () => onOperatorButtonClick('-'), type: 'string' },
    { value: '1', onClick: () => onDigitButtonClick(1), type: 'number' },
    { value: '2', onClick: () => onDigitButtonClick(2), type: 'number' },
    { value: '3', onClick: () => onDigitButtonClick(3), type: 'number' },
    { value: '+', onClick: () => onOperatorButtonClick('+'), type: 'string' },
    { value: '0', onClick: () => onDigitButtonClick(0), type: 'number' },
    { value: '.', onClick: onPointButtonClick, type: 'string' },
    { value: '=', onClick: onEqualButtonClick, type: 'string' },
  ];

  return {
    display,
    result,
    waitingForOperand,
    buttonList,
    pendingOperator,
    memory,
    logs,
    setLogs,
  };
};
