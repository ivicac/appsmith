import React, { Fragment, useState } from "react";
import { CommonComponentProps, Classes } from "./common";
import Text, { TextType } from "./Text";
import styled from "styled-components";
import {
  Popover,
  PopoverInteractionKind,
} from "@blueprintjs/core/lib/esm/components/popover/popover";
import { Position } from "@blueprintjs/core/lib/esm/common/position";
import Icon, { IconSize } from "./Icon";
import Spinner from "./Spinner";

type DropdownOption = {
  name: string;
  desc: string;
};

type DropdownProps = CommonComponentProps & {
  options: DropdownOption[];
  onSelect: (selectedValue: DropdownOption) => void;
  selectedIndex: number;
  position?: Position;
};

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .${Classes.TEXT} {
    margin-right: ${(props) => props.theme.spaces[1] + 1}px;
  }
`;

const OptionsWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.tableDropdown.bg};
  box-shadow: ${(props) => props.theme.spaces[0]}px
    ${(props) => props.theme.spaces[5]}px
    ${(props) => props.theme.spaces[13] - 2}px
    ${(props) => props.theme.colors.tableDropdown.shadow};
`;

const DropdownOption = styled.div<{
  isSelected: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? `background-color: ${props.theme.colors.tableDropdown.selectedBg}`
      : null};

  .${Classes.TEXT}:last-child {
    margin-top: ${(props) => props.theme.spaces[1] + 1}px;
  }

  &:hover {
    .${Classes.TEXT} {
      color: ${(props) => props.theme.colors.tableDropdown.selectedText};
    }
  }
`;

const Content = styled.div<{ isLoading?: boolean }>`
  position: relative;

  & .${Classes.SPINNER} {
    position: absolute;
  }

  & .selected-item {
    ${(props) => (props.isLoading ? `visibility: hidden;` : null)}
  }
`;

function TableDropdown(props: DropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.options[props.selectedIndex] || {},
  );

  const optionSelector = (index: number) => {
    setSelectedIndex(index);
    setSelectedOption(props.options[index]);
    props.onSelect && props.onSelect(props.options[index]);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {props.isLoading ? (
        <Spinner size={IconSize.LARGE} />
      ) : (
        <Popover
          data-cy={props.cypressSelector}
          interactionKind={PopoverInteractionKind.CLICK}
          isOpen={isDropdownOpen}
          onInteraction={(state) => setIsDropdownOpen(state)}
          position={props.position || Position.BOTTOM_LEFT}
          usePortal={false}
        >
          <Content isLoading={props.isLoading}>
            <SelectedItem className="selected-item">
              <Text type={TextType.P1}>{selectedOption.name}</Text>
              <Icon name="downArrow" size={IconSize.XXS} />
            </SelectedItem>
          </Content>
          <OptionsWrapper>
            {props.options.map((el: DropdownOption, index: number) => (
              <DropdownOption
                isSelected={selectedIndex === index}
                key={index}
                onClick={() => optionSelector(index)}
              >
                <Text type={TextType.H5}>{el.name}</Text>
                <Text type={TextType.P3}>{el.desc}</Text>
              </DropdownOption>
            ))}
          </OptionsWrapper>
        </Popover>
      )}
    </>
  );
}

export default TableDropdown;
