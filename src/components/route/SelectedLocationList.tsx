import styled from "styled-components";
import { Location, Props } from "../../types/components/route";

const SelectedLocationList = ({
  locations,
  isOptimized,
  optimizedLocations,
  onRemove,
  showButtons,
  onSave,
  onEdit,
}: Props) => {
  const chunkArray = (arr: Location[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  return (
    <SelectedListWrapper>
      {chunkArray(locations, 5).map((row, rowIdx) => (
        <SelectedRow key={rowIdx}>
          {row.map((loc) => (
            <SelectedItem key={loc.name}>
              {isOptimized && optimizedLocations && (
                <OrderCircle>
                  {optimizedLocations.findIndex(
                    (l) =>
                      l.latitude === loc.latitude &&
                      l.longitude === loc.longitude
                  ) + 1}
                </OrderCircle>
              )}
              {loc.name}
              {onRemove && (
                <RemoveBtn onClick={() => onRemove(loc.name)}>×</RemoveBtn>
              )}
            </SelectedItem>
          ))}
        </SelectedRow>
      ))}

      {showButtons && (
        <>
          {locations.length > 0 && !isOptimized && (
            <CompleteBtn onClick={onSave}>선택 완료</CompleteBtn>
          )}
          {isOptimized && (
            <BtnRow>
              <SaveBtn onClick={onSave}>저장</SaveBtn>
              <EditBtn onClick={onEdit}>수정</EditBtn>
            </BtnRow>
          )}
        </>
      )}
    </SelectedListWrapper>
  );
};

export default SelectedLocationList;

const SelectedListWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  z-index: 10;
`;

const SelectedRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const SelectedItem = styled.div`
  background: #fff;
  border: 1px solid #036635;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #4ade80;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #036635;
  font-size: 1.1rem;
  cursor: pointer;
`;

const CompleteBtn = styled.button`
  background: #fff;
  border: 1px solid #036635;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  color: #036635;
  cursor: pointer;
  margin-left: 1rem;
`;

const SaveBtn = styled.button`
  background: #4ade80;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
`;

const EditBtn = styled.button`
  background: #e2e8f0;
  color: #036635;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
