import { v } from '../../../styles/variables';
import styled from 'styled-components';
import type { Table } from '@tanstack/react-table';
import { BtnMolecule } from '../../../index';

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  return (
    <Container>
      <BtnMolecule
        disabled={!table.getCanPreviousPage()}
        funcion={() => table.setPageIndex(0)}
        bgcolor='#F3D20C'
        icon={<v.iconotodos />}
      />

      <BtnMolecule
        disabled={!table.getCanPreviousPage()}
        funcion={() => table.previousPage()}
        bgcolor='#F3D20C'
        icon={<v.iconoflechaizquierda />}
      />

      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>

      <BtnMolecule
        disabled={!table.getCanNextPage()}
        funcion={() => table.nextPage()}
        bgcolor='#F3D20C'
        icon={<v.iconoflechaderecha />}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
