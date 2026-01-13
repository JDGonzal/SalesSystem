SELECT        MIN(dFechaMovimientoMin) AS FechaMin, MAX(dFechaMovimientoMax) AS FechaMax, C_C, ID, SUM(Vlr_Total_K) AS [Vlr.Total.K], SUM(Vlr_Total_I) AS [Vlr.Total.I], SUM(Vlr_Total_K) + SUM(Vlr_Total_I) AS [Vlr.Total.K.I], 
                         SUM(Creditos) AS Créditos, MAX(Cupo_Max) AS Cupo, SUM(Articulos_) AS Articulos
FROM            (SELECT        M2.dFechaMovimiento AS dFechaMovimientoMin, M2.dFechaMovimiento AS dFechaMovimientoMax, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 
                                                    M2.iValorTotal * CASE T2.sSigno WHEN '-' THEN - 1 WHEN '+' THEN 1 END AS Vlr_Total_K, 0.0 AS Vlr_Total_I, 0 AS Creditos, M2.iValorTotal AS Cupo_Max, 0 AS Articulos_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                    dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaKapital = 1) AND (T2.bAfectaInteres = 0) AND (T2.iCodTipoMovimientoPri IN (1, 2, 6, 12))
                          UNION
                          SELECT        M2.dFechaMovimiento AS dFechaMovimientoMin, NULL AS dFechaMovimientoMax, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 0.0 AS Vlr_Total_K, 
                                                   M2.iValorTotal * CASE T2.sSigno WHEN '-' THEN - 1 WHEN '+' THEN 1 END AS Vlr_Total_I, 0 AS Creditos, 0.0 AS Cupo_Max, 0.0 AS Articulos_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                   dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaKapital = 0) AND (T2.bAfectaInteres = 1) AND (T2.iCodTipoMovimientoPri IN (1, 2, 6, 12))
                          UNION
                          SELECT        M2.dFechaMovimiento AS dFechaMovimientoMin, NULL AS dFechaMovimientoMax, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 
                                                   M2.iValorTotal * CASE T2.sSigno WHEN '-' THEN - 1 WHEN '+' THEN 1 END AS Vlr_Total_K, 0.0 AS Vlr_Total_I, 0 AS Creditos, M2.iValorTotal AS Cupo_Max, 
                                                   CASE T2.sSigno WHEN '-' THEN M2.iCantidad WHEN '+' THEN 0 END AS Articulos_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                   dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaKapital = 1) AND (T2.bAfectaInteres = 0) AND (NOT (T2.iCodTipoMovimientoPri IN (1, 2, 6, 12)))
                          UNION
                          SELECT        M2.dFechaMovimiento AS dFechaMovimientoMin, NULL AS dFechaMovimientoMax, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 0.0 AS VLR_TOTAL_K, 
                                                   M2.iValorTotal * CASE T2.SSIGNO WHEN '-' THEN - 1 WHEN '+' THEN 1 END AS VLR_TOTAL_I, 0 AS CREDITOS, 0.0 AS CUPO_MAX, 0.0 AS ARTICULOS_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                   dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaKapital = 0) AND (T2.bAfectaInteres = 1) AND (NOT (T2.iCodTipoMovimientoPri IN (1, 2, 6, 12)))
                          UNION
                          SELECT        M2.dFechaMovimiento AS DFECHAMOVIMIENTOMIN, NULL AS DFECHAMOVIMIENTOMAX, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 
                                                   0.0 AS VLR_TOTAL_K, 0.0 AS VLR_TOTAL_I, 0 AS CREDITOS, M2.iValorTotal AS CUPO_MAX, 0.0 AS ARTICULOS_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                   dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaKapital = 0) AND (T2.bAfectaInteres = 0) AND (T2.iCodTipoMovimientoPri IN (1, 2, 6, 12))
                          UNION
                          SELECT        dFechaMovimiento AS DFECHAMOVIMIENTOMIN, NULL AS DFECHAMOVIMIENTOMAX, iConsecutivoMovimiento, 0 AS ILINEANUMERO, iCodCentroCosto AS C_C, iCodTerceroPri AS ID, 0.0 AS VLR_TOTAL_K, 
                                                   0.0 AS VLR_TOTAL_I, iCantidadCreditos AS CREDITOS, 0.0 AS CUPO_MAX, 0 AS ARTICULOS_
                          FROM            dbo.tblMovimientosPri AS M1
                          WHERE        (iCodTipoMovimientoPri IN (1, 2, 6, 12))
                          UNION
                          SELECT        M2.dFechaMovimiento AS DFECHAMOVIMIENTOMIN, NULL AS DFECHAMOVIMIENTOMAX, M2.iConsecutivoMovimiento, M2.iLineaNumero, M2.iCodCentroCosto AS C_C, M2.iCodTerceroSec AS ID, 
                                                   0.0 AS VLR_TOTAL_K, 0.0 AS VLR_TOTAL_I, 0 AS CREDITOS, 0.0 AS CUPO_MAX, CASE T2.SSIGNO WHEN '-' THEN M2.ICANTIDAD WHEN '+' THEN 0 END AS ARTICULOS_
                          FROM            dbo.tblMovimientosSec AS M2 INNER JOIN
                                                   dbo.tblTipoMovimientosSec AS T2 ON M2.iCodTipoMovimientoSec = T2.iCodTipoMovimientoSec
                          WHERE        (T2.bAfectaInventario = 1)) AS M
GROUP BY ID, C_C