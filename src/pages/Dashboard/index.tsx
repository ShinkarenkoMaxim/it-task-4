import React, { useEffect } from 'react';
import _, { difference } from 'lodash';
import DataTable, { TableColumn } from 'react-data-table-component';
import { HiLockOpen, HiLockClosed, HiTrash } from 'react-icons/hi';
import { blockUsers, deleteUsers, getUsers, unblockUsers } from '../../api';

type UserDataRow = {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: string;
};

const columns: TableColumn<UserDataRow>[] = [
  {
    name: 'ID',
    selector: ({ id }) => id,
  },
  {
    name: 'Name',
    selector: ({ name }) => name,
  },
  {
    name: 'Email',
    selector: ({ email }) => email,
  },
  {
    name: 'Registration Date',
    selector: ({ registrationDate }) => registrationDate,
  },
  {
    name: 'Last Login',
    selector: ({ lastLogin }) => lastLogin,
  },
  {
    name: 'Status',
    selector: ({ status }) => status,
  },
];

export const Dashboard: React.FC = (): JSX.Element => {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [toggleCleared, setToggleCleared] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const users = await getUsers();
        setData(users.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleRowSelected = React.useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleBlock = async () => {
      setToggleCleared(!toggleCleared);
      setIsLoading(true);

      const usersIdsToBlock = selectedRows.map((v) => v.id);
      const updatedUsers = data.map((user) => {
        if (usersIdsToBlock.includes(user.id)) {
          return { ...user, status: 'BLOCKED' };
        }

        return user;
      });

      try {
        await blockUsers(usersIdsToBlock);
      } catch (err) {
        console.log(err);
      }

      setData(updatedUsers);
      setIsLoading(false);
    };

    const handleUnblock = async () => {
      setToggleCleared(!toggleCleared);
      setIsLoading(true);

      const usersIdsToUnblock = selectedRows.map((v) => v.id);
      const updatedUsers = data.map((user) => {
        if (usersIdsToUnblock.includes(user.id)) {
          return { ...user, status: 'ACTIVE' };
        }

        return user;
      });

      try {
        await unblockUsers(usersIdsToUnblock);
      } catch (err) {
        console.log(err);
      }

      setData(updatedUsers);
      setIsLoading(false);
    };

    const handleDelete = async () => {
      setToggleCleared(!toggleCleared);

      const usersIds = selectedRows.map((v) => v.id);

      try {
        await deleteUsers(usersIds);
      } catch (err) {
        console.log(err);
      }

      setData(difference(data, selectedRows));
    };

    return (
      <div className="flex gap-6">
        <button key="block" onClick={handleBlock} title="Block">
          <HiLockClosed size={25} color="black" />
        </button>
        <button key="unblock" onClick={handleUnblock} title="Unblock">
          <HiLockOpen size={25} color="green" />
        </button>
        <button key="delete" onClick={handleDelete} title="Delete">
          <HiTrash size={25} color="red" />
        </button>
      </div>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <div className="w-full max-w-7xl">
      <h2 className="font-semibold py-6 text-2xl tracking-wide">Dashboard</h2>
      <DataTable
        title="Users"
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        contextActions={contextActions}
        progressPending={isLoading}
      />
    </div>
  );
};
