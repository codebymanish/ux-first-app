import React from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";
import { Routes, AppMsg } from "../../utils";
import { FooterButtons } from "../../components";
import { BuildingsServices } from "../../services";

const cssBase = "allBuildingsPage";

export default class AllBuildingsPage extends React.PureComponent {
  state = {
    buildings: [],
  };

  async loadBuildings() {
    const buildings = await BuildingsServices.getAllBuildings();
    this.setState({ buildings });
  }

  componentDidMount() {
    this.loadBuildings();
  }

  render() {
    const { buildings } = this.state;
    buildings.forEach((item) => {
      item.id = item._id;
    });
    const headers = [
      {
        key: "building",
        header: AppMsg.getMessage(AppMsg.MESSAGES.NAME),
      },
      {
        key: "parentProperty",
        header: AppMsg.getMessage(AppMsg.MESSAGES.PARENT_PROPERTY),
      },
    ];
    return (
      <div className={cssBase}>
        <div className={`${cssBase}__content`}>
          <DataTable rows={buildings} headers={headers}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getTableContainerProps,
            }) => (
              <TableContainer
                title={AppMsg.getMessage(AppMsg.MESSAGES.BUILDINGS)}
                description={AppMsg.getMessage(
                  AppMsg.MESSAGES.ALL_BUILDINGS_DESCRIPTION
                )}
                {...getTableContainerProps()}
              >
                <Table {...getTableProps()} isSortable>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                          isSortable
                        >
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </div>
        <FooterButtons
          secondaryLabel={AppMsg.getMessage(AppMsg.BUTTONS.HOME)}
          secondaryRoute={Routes.HOME}
        />
      </div>
    );
  }
}