"use client";

import { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import Table from "@/components/Table";
import styles from "./table.module.css";
import { useSession } from "next-auth/react";

function GradeTable() {
  const [grades, setGrades] = useState<ApiGrade[]>([]);
  const [cols, setCols] = useState(["#", "Grado", "Sección", "Nivel"]);
  const search = useSearchParams(),
    query = search.get("search");
  const { data, isLoading } = useSWR<ApiGrade[]>("/grades");
  const { data: session } = useSession();

  useEffect(() => {
    if (data) {
      if (query) {
        const filterData = data.filter(
          (g) =>
            g.label.toString().includes(query) ||
            g.section.includes(query) ||
            g.academicLevel.name.includes(query)
        );

        return setGrades(filterData);
      }

      setGrades(data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (session && session.user.permissionsLevel === 2)
      setCols([...cols, "Opciones"]);
  }, []);

  return (
    <>
      {query && (
        <p>
          <strong>{grades.length}</strong>{" "}
          {grades.length === 1 ? "Resultado" : "Resultados"} de la busqueda "
          {query}"
        </p>
      )}
      <Table>
        <Table.Head>
          {cols.map((label) => (
            <Table.Col key={label}>{label}</Table.Col>
          ))}
        </Table.Head>
        <Table.Body>
          {grades.map(({ id, label, section, academicLevel }, i) => (
            <Table.Row key={id}>
              <Table.Item label={cols[0]}>{i + 1}</Table.Item>
              <Table.Item label={cols[1]}>{label}</Table.Item>
              <Table.Item label={cols[2]}>"{section}"</Table.Item>
              <Table.Item label={cols[3]}>{academicLevel.name}</Table.Item>
              {session && session.user.permissionsLevel === 2 && (
                <Table.Item label={cols[4]}>
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
                </Table.Item>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default GradeTable;
