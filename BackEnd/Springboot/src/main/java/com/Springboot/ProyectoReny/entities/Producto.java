package com.Springboot.ProyectoReny.entities;

import com.Springboot.ProyectoReny.validation.IsExistsDb;
import com.Springboot.ProyectoReny.validation.IsRequired;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "producto")
public class Producto {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @IsRequired
    // @IsExistsDb
    private String sku;

    @IsRequired(message = "{IsRequired.producto.nombre}")
    @Size(min=3, max=40)
    private String nombre;

    @NotNull(message = "{NotNull.product.price}")
    private Double precio_compra;

    @NotNull(message = "{NotNull.product.price}")
    private Double precio_venta;
    private Integer cantidad;
    private String proveedor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecioCompra() {
        return precio_compra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precio_compra = precioCompra;
    }

    public Double getPrecioVenta() {
        return precio_venta;
    }

    public void setPrecioVenta(Double precioVenta) {
        this.precio_venta = precioVenta;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }
    public String getSku() {
        return sku;
    }
    public void setSku(String sku) {
        this.sku = sku;
    }
}
