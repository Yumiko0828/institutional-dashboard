import { FiEdit, FiTrash } from "react-icons/fi";
import { ApiGrade } from "@/provider/api.definitions";
import Table from "@/components/Table";
import styles from "./table.module.css";
import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

export type Filter = (value: ApiGrade) => boolean;

interface Props {
  filter?: Filter;
  onFilterResults?: (length: number) => void;
}

function GradeTable({ filter: f, onFilterResults }: Props) {
  const { data: grades } = useSWR<ApiGrade[]>("/grades");
  const cols = ["#", "Grado", "Sección", "Nivel", "Opciones"];
  const { data: session } = useSession();

  const filteredGrades = useMemo(() => {
    if (!grades) return [];
    return f ? (grades || []).filter(f) : grades;
  }, [grades, f, onFilterResults]);

  useEffect(() => {
    if (f && onFilterResults) {
      onFilterResults(filteredGrades.length);
    }
  }, [filteredGrades, f, onFilterResults]);

  return (
    <>
      <Table>
        <Table.Head>
          {cols.map((label) => (
            <Table.Col key={label}>{label}</Table.Col>
          ))}
        </Table.Head>
        <Table.Body>
          {filteredGrades.map(({ id, label, section, academicLevel }, i) => (
            <Table.Row key={id}>
              <Table.Item label={cols[0]}>{i + 1}</Table.Item>
              <Table.Item label={cols[1]}>{label}</Table.Item>
              <Table.Item label={cols[2]}>"{section}"</Table.Item>
              <Table.Item label={cols[3]}>{academicLevel.name}</Table.Item>
              <Table.Item label={cols[4]}>
                {session && session.user.permissionsLevel === 2 && (
                  <div className={styles.btn_group}>
                    <button
                      type="button"
                      data-type="update"
                      className={styles.btn}
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      data-type="delete"
                      className={styles.btn}
                      onClick={() =>
                        confirm(
                          `Esta acción eliminará el elemento ${
                            i + 1
                          } (Grado ${label} "${section}" - ${
                            academicLevel.name
                          }) de la lista y sus datos asociados.\n¿Desea continuar?`
                        )
                      }
                    >
                      <FiTrash />
                    </button>
                  </div>
                )}
              </Table.Item>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default GradeTable;
